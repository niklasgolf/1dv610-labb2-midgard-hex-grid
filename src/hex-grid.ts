import type { Coordinate } from './coordinate.js'

import { CoordinateValidator } from './coordinate.js'

import type { GridOrientation } from './orientation.js'

import { NeighbourCalculator } from './neighbours.js'

import type {
  Bounds,
  Point
} from './geometry.js'

import { HexagonGeometry } from './geometry.js'

import { CoordinatePositioner } from './coordinate-positioner.js'

import {
  CoordinateRange
} from './coordinate-range.js'

import type {
  CoordinateRangeConfig,
  CoordinateRangeOptions
} from './coordinate-range.js'

import {
  CoordinateRangeFiller
} from './coordinate-range-fill.js'

import {
  CoordinateLayer
} from './coordinate-layer.js'

import type {
  LayeredCoordinate
} from './coordinate-layer.js'

/**
 * Describes a coordinate range when using a HexGrid instance.
 *
 * The orientation is not included because the HexGrid instance
 * already has its own orientation.
 */
export type HexGridRange = Omit<
  CoordinateRangeConfig,
  'orientation'
>

/**
 * Options for creating one single hexagon.
 */
export type SingleHexagonOptions = {
  hexDiameter: number
}

/**
 * Options for creating a complete Midgard grid.
 *
 * The skeleton width and height describe the rectangular
 * skeleton that the complete grid is built around.
 */
export type HexGridOptions = {
  hexDiameter: number
  skeletonWidth: number
  skeletonHeight: number
}

/**
 * Represents one complete hexagon prepared for rendering.
 */
export type Hexagon = {
  coordinate: Coordinate
  center: Point
  points: Point[]
}

/**
 * Represents a hexagon in a complete Midgard grid.
 *
 * The z-index describes the rendering layer of the hexagon.
 */
export type LayeredHexagon = Hexagon & {
  zIndex: number
}

/**
 * Represents a Midgard hex grid with a specific orientation.
 */
export class HexGrid {
  private readonly orientation: GridOrientation

  /**
   * Creates a new Midgard hex grid.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

  /**
   * Creates one single hexagon without any surrounding fill.
   *
   * @param options - The geometric size of the hexagon.
   * @returns One complete hexagon prepared for rendering.
   */
  createSingleHexagon(
    options: SingleHexagonOptions
  ): Hexagon {
    const coordinates = this.getCoordinateRange(
      {
        width: 1,
        height: 1
      },
      {
        fillAround: false
      }
    )

    const coordinate = coordinates[0]

    if (coordinate === undefined) {
      throw new Error(
        'Could not create the single hexagon coordinate.'
      )
    }

    return this.createHexagon(
      coordinate,
      options.hexDiameter
    )
  }

  /**
   * Creates a complete Midgard grid around a skeleton.
   *
   * Surrounding coordinates are always filled automatically.
   * The returned hexagons are sorted for rendering and include
   * calculated z-index values.
   *
   * @param options - The hexagon size and skeleton dimensions.
   * @returns All layered hexagons belonging to the complete grid.
   */
  createGrid(
    options: HexGridOptions
  ): LayeredHexagon[] {
    const coordinates =
      this.getLayeredCoordinateRange(
        {
          width: options.skeletonWidth,
          height: options.skeletonHeight
        },
        {
          fillAround: true
        }
      )

    return coordinates.map((coordinate) => {
      const hexagon = this.createHexagon(
        coordinate,
        options.hexDiameter
      )

      return {
        ...hexagon,
        zIndex: coordinate.zIndex
      }
    })
  }

  /**
   * Returns the six neighbouring coordinates of a coordinate
   * using this grid's orientation.
   *
   * @param coordinate - The coordinate whose neighbours should be found.
   * @returns The six neighbouring coordinates.
   */
  getNeighbours(
    coordinate: Coordinate
  ): Coordinate[] {
    const neighbourCalculator =
      new NeighbourCalculator(this.orientation)

    return neighbourCalculator.getNeighbours(
      coordinate
    )
  }

  /**
   * Checks whether a coordinate is valid in the Midgard hex grid system.
   *
   * @param coordinate - The coordinate to validate.
   * @returns `true` if the coordinate is valid; otherwise `false`.
   */
  isValidCoordinate(
    coordinate: Coordinate
  ): boolean {
    const validator = new CoordinateValidator()

    return validator.isValidCoordinate(
      coordinate
    )
  }

  /**
   * Calculates the center position of a Midgard coordinate
   * using this grid's orientation.
   *
   * For an x-dominated grid, size represents the
   * complete width of one hexagon.
   *
   * For a y-dominated grid, size represents the
   * complete height of one hexagon.
   *
   * @param coordinate - The Midgard coordinate to position.
   * @param size - The width or height of one hexagon.
   * @returns The calculated center point.
   */
  getCenterPosition(
    coordinate: Coordinate,
    size: number
  ): Point {
    const positioner =
      new CoordinatePositioner(this.orientation)

    return positioner.getCenterPosition(
      coordinate,
      size
    )
  }

  /**
   * Calculates the six corner points of a hexagon
   * using this grid's orientation.
   *
   * @param center - The center point of the hexagon.
   * @param size - The dimension used to calculate the hexagon.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    size: number
  ): Point[] {
    const geometry =
      new HexagonGeometry(this.orientation)

    return geometry.getHexagonPoints(
      center,
      size
    )
  }

  /**
   * Calculates the outer geometric bounds of hexagons
   * represented by Midgard coordinates.
   *
   * Each coordinate is first converted to a center position.
   * The six corner points of every hexagon are then calculated,
   * and the outermost values are used to determine the bounds.
   *
   * @param coordinates - The coordinates whose bounds should be calculated.
   * @param size - The width or height of one hexagon.
   * @returns The outer bounds of all hexagons.
   */
  getGridBounds(
    coordinates: Coordinate[],
    size: number
  ): Bounds {
    const geometry =
      new HexagonGeometry(this.orientation)

    const points: Point[] = []

    for (const coordinate of coordinates) {
      const center = this.getCenterPosition(
        coordinate,
        size
      )

      const hexagonPoints =
        geometry.getHexagonPoints(
          center,
          size
        )

      points.push(...hexagonPoints)
    }

    return geometry.getBounds(points)
  }

  /**
   * Creates all coordinates belonging to a coordinate range
   * using this grid's orientation.
   *
   * @param range - The range skeleton to create.
   * @param options - Options controlling how the range is created.
   * @returns All coordinates belonging to the range.
   */
  getCoordinateRange(
    range: HexGridRange,
    options: CoordinateRangeOptions = {}
  ): Coordinate[] {
    const coordinateRange = new CoordinateRange({
      ...range,
      orientation: this.orientation
    })

    const coordinateRangeFiller =
      new CoordinateRangeFiller(coordinateRange)

    return coordinateRangeFiller.getCoordinateRange(
      options
    )
  }

  /**
   * Creates a coordinate range prepared for rendering.
   *
   * The coordinates are sorted by y and then x.
   * The first y row receives z-index 100 and each
   * following row increases the z-index by 100.
   *
   * @param range - The range skeleton to create.
   * @param options - Options controlling how the range is created.
   * @returns The sorted coordinates with calculated z-index values.
   */
  getLayeredCoordinateRange(
    range: HexGridRange,
    options: CoordinateRangeOptions = {}
  ): LayeredCoordinate[] {
    const coordinates = this.getCoordinateRange(
      range,
      options
    )

    const coordinateLayer = new CoordinateLayer(
      coordinates
    )

    return coordinateLayer.getLayeredCoordinates()
  }

  /**
   * Creates the geometry for one Midgard coordinate.
   */
  private createHexagon(
    coordinate: Coordinate,
    hexDiameter: number
  ): Hexagon {
    const center = this.getCenterPosition(
      coordinate,
      hexDiameter
    )

    const points = this.getHexagonPoints(
      center,
      hexDiameter
    )

    return {
      coordinate,
      center,
      points
    }
  }
}