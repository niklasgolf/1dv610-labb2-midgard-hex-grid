export const MIDGARD_HEX_GRID_VERSION = '1.0.0'

export type { Coordinate } from './coordinate.js'

export {
  CoordinateValidator
} from './coordinate.js'

export type { GridOrientation } from './orientation.js'

export {
  NeighbourCalculator
} from './neighbours.js'

export type {
  Bounds,
  Point
} from './geometry.js'

export {
  HexagonGeometry
} from './geometry.js'

export {
  CoordinatePositioner
} from './coordinate-positioner.js'

export type {
  CoordinateRangeConfig,
  CoordinateRangeOptions
} from './coordinate-range.js'

export {
  CoordinateRange
} from './coordinate-range.js'

export {
  CoordinateRangeFiller
} from './coordinate-range-fill.js'

export type {
  LayeredCoordinate
} from './coordinate-layer.js'

export {
  CoordinateLayer
} from './coordinate-layer.js'

export type {
  Hexagon,
  HexGridOptions,
  HexGridRange,
  LayeredHexagon,
  SingleHexagonOptions
} from './hex-grid.js'

export {
  HexGrid
} from './hex-grid.js'