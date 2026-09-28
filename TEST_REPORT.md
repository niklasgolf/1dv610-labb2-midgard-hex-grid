# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
-->

## Summary

The module was tested in two complementary ways: with automated tests using Vitest and with manual tests in a separate Test-App. Both approaches were important because the library contains both mathematical logic that can be checked against exact expected results and visual grid behaviour that is useful to inspect when the library is actually used.

The automated tests cover coordinate validation, neighbour calculation, coordinate ranges, range filling, coordinate positioning, hexagon geometry and coordinate layering. The high-level `HexGrid` class is also tested to make sure that these parts work together correctly. Both x-dominated and y-dominated grids are tested where the orientation affects the result.

The Test-App was used for manual testing of the library. It creates and displays grids using the library, making it possible to visually check important behaviour such as x-dominated and y-dominated grids, single hexagons, neighbouring tiles, layering and different ways of rendering and styling the generated hexagons. This complements the automated tests because mathematical results can be checked automatically while the resulting grids can also be inspected visually in a real application.

The automated tests can be reproduced by cloning the repository, installing the dependencies with `npm install`, and running:

```bash
npx vitest run
```

The manual tests can be reproduced by running the separate Test-App and using its different demonstration pages to inspect the generated grids and library behaviour.

## Test Results

**Example** (shows what a filled-in row can look like — remove this example table before
submitting):

| What was tested                                                        | How it was tested                                                                                                       | Result                                                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Jpeg.load(path)` returns a `Picture` instance for a valid image file. | Automated unit test (Vitest): loaded `test-image.jpg` and checked that the return value had `getHeight()`/`getWidth()` methods. | ✅ Passed.                                                                    |
| `Picture.getPixelAt(x, y)` with coordinates outside the image.         | Manual test via the Test-App's interface: entered a coordinate pair larger than the image's width/height and observed the output. | ❌ Didn't throw an error initially — fixed, now throws a clear exception. |

**Your test results:**

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |