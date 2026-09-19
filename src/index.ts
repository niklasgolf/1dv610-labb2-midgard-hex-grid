export const MIDGARD_HEX_GRID_VERSION = '1.0.0'

export type { Coordinate } from './coordinate.js'
export { isValidCoordinate } from './coordinate.js'

export type { GridOrientation } from './orientation.js'

export {
  getXDominatedNeighbours,
  getYDominatedNeighbours
} from './neighbours.js'