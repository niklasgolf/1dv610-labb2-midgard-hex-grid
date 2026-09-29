/**
 * Determines whether a Midgard coordinate range
 * should be filled around its skeleton.
 */
export class CoordinateRangeFillAround {
    /**
     * Determines whether surrounding coordinates should be added.
     *
     * A 1 by 1 skeleton can choose whether to use fillAround.
     * Any larger skeleton is always filled around automatically.
     *
     * @param width - The width of the coordinate range.
     * @param height - The height of the coordinate range.
     * @param fillAround - Whether a 1 by 1 range should be filled around.
     * @returns True if the range should be filled around.
     */
    shouldFillAround(
      width: number,
      height: number,
      fillAround: boolean = false
    ): boolean {
      const isSingleCoordinate =
        width === 1 && height === 1
  
      if (!isSingleCoordinate) {
        return true
      }
  
      if (fillAround) {
        return true
      }
  
      return false
    }
  }