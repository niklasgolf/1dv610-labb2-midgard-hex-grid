import type { GridOrientation } from './orientation.js'

/**
 * Represents a two-dimensional point used for geometric calculations.
 *
 * The x and y values can for example represent a position
 * in an SVG coordinate system.
 */
export type Point = {
  x: number
  y: number
}

/**
 * Calculates geometric values for hexagons
 * in a Midgard hex grid.
 *
 * The orientation determines whether the main dimension
 * of a hexagon represents its width or height.
 */
export class HexagonGeometry {
  private readonly orientation: GridOrientation

  /**
   * Creates a new hexagon geometry calculator.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

  /**
   * Calculates the six corner points
   * of an x-dominated hexagon.
   *
   * The width represents the complete horizontal width
   * of the hexagon.
   *
   * @param center - The center point of the hexagon.
   * @param width - The complete width of the hexagon.
   * @returns The six corner points of the hexagon.
   */
  getXDominatedHexagonPoints(
    center: Point,
    width: number
  ): Point[] {
    const halfWidth = width / 2
    const radius = width / Math.sqrt(3)
    const halfRadius = radius / 2

    const top: Point = {
      x: center.x,
      y: center.y - radius
    }

    const upperRight: Point = {
      x: center.x + halfWidth,
      y: center.y - halfRadius
    }

    const lowerRight: Point = {
      x: center.x + halfWidth,
      y: center.y + halfRadius
    }

    const bottom: Point = {
      x: center.x,
      y: center.y + radius
    }

    const lowerLeft: Point = {
      x: center.x - halfWidth,
      y: center.y + halfRadius
    }

    const upperLeft: Point = {
      x: center.x - halfWidth,
      y: center.y - halfRadius
    }

    return [
      top,
      upperRight,
      lowerRight,
      bottom,
      lowerLeft,
      upperLeft
    ]
  }

  /**
   * Calculates the six corner points
   * of a y-dominated hexagon.
   *
   * The height represents the complete vertical height
   * of the hexagon.
   *
   * @param center - The center point of the hexagon.
   * @param height - The complete height of the hexagon.
   * @returns The six corner points of the hexagon.
   */
  getYDominatedHexagonPoints(
    center: Point,
    height: number
  ): Point[] {
    const halfHeight = height / 2
    const radius = height / Math.sqrt(3)
    const halfRadius = radius / 2

    const upperLeft: Point = {
      x: center.x - halfRadius,
      y: center.y - halfHeight
    }

    const upperRight: Point = {
      x: center.x + halfRadius,
      y: center.y - halfHeight
    }

    const right: Point = {
      x: center.x + radius,
      y: center.y
    }

    const lowerRight: Point = {
      x: center.x + halfRadius,
      y: center.y + halfHeight
    }

    const lowerLeft: Point = {
      x: center.x - halfRadius,
      y: center.y + halfHeight
    }

    const left: Point = {
      x: center.x - radius,
      y: center.y
    }

    return [
      upperLeft,
      upperRight,
      right,
      lowerRight,
      lowerLeft,
      left
    ]
  }

  /**
   * Calculates the six corner points of a hexagon
   * using this geometry's grid orientation.
   *
   * For an x-dominated grid, dimension represents the width.
   * For a y-dominated grid, dimension represents the height.
   *
   * @param center - The center point of the hexagon.
   * @param dimension - The width or height, depending on orientation.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    dimension: number
  ): Point[] {
    if (this.orientation === 'x-dominated') {
      return this.getXDominatedHexagonPoints(
        center,
        dimension
      )
    }

    return this.getYDominatedHexagonPoints(
      center,
      dimension
    )
  }
}