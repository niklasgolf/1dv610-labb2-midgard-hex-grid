/**
 * Validates the dimensions of a Midgard coordinate range.
 */
export class CoordinateRangeValidator {
    /**
     * Checks whether width and height are valid range dimensions.
     *
     * Both dimensions must be positive integers.
     *
     * @param width - The width of the coordinate range.
     * @param height - The height of the coordinate range.
     * @returns True if both dimensions are valid.
     */
    isValid(
      width: number,
      height: number
    ): boolean {
      if (!Number.isInteger(width)) {
        return false
      }
  
      if (!Number.isInteger(height)) {
        return false
      }
  
      if (width < 1) {
        return false
      }
  
      if (height < 1) {
        return false
      }
  
      return true
    }
  }