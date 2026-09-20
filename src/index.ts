export const MIDGARD_HEX_GRID_VERSION = '1.0.0'

export type { Coordinate } from './coordinate.js'

export { isValidCoordinate } from './coordinate.js'

export type { GridOrientation } from './orientation.js'

export {
  NeighbourCalculator
} from './neighbours.js'

export type { Point } from './geometry.js'

export {
  getXDominatedHexagonPoints,
  getYDominatedHexagonPoints,
  getHexagonPoints
} from './geometry.js'

export type {
  CoordinateRangeConfig,
  CoordinateRangeOptions
} from './coordinate-range.js'

export {
  CoordinateRange
} from './coordinate-range.js'

export {
  getCoordinatesAround,
  getCoordinateRange
} from './coordinate-range-fill.js'

export type {
  LayeredCoordinate
} from './coordinate-layer.js'

export {
  CoordinateLayer
} from './coordinate-layer.js'

export type { HexGridRange } from './hex-grid.js'

export { HexGrid } from './hex-grid.js'