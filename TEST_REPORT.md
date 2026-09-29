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

The manual tests can be reproduced using the separate [Midgard Test-App](https://github.com/niklasgolf/1dv610-labb2-midgard-test-app). Run the Test-App and use its different demonstration pages to inspect the generated grids and library behaviour.

## Test Results

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
| Coordinate validation (`coordinate.test.ts`) | Automated tests checked valid even/even and odd/odd coordinates and rejected coordinates with mismatched parity, decimal values or negative values. | ✅ 7 of 7 tests passed. |
| Neighbour calculation (`neighbours.test.ts`) | Automated tests checked that exactly six correct neighbouring coordinates are returned for both x-dominated and y-dominated grids, including the orientation-dependent `getNeighbours()` method. | ✅ 6 of 6 tests passed. |
| Coordinate range creation (`coordinate-range.test.ts`) | Automated tests checked valid and invalid range dimensions, creation of 1 × 1 and larger skeletons, and the rules controlling when surrounding coordinates should be added. | ✅ 14 of 14 tests passed. |
| Coordinate range filling (`coordinate-range-fill.test.ts`) | Automated tests checked surrounding coordinates for both orientations, optional filling of a 1 × 1 range, automatic filling of larger ranges and that duplicate coordinates are not produced. | ✅ 6 of 6 tests passed. |
| Coordinate positioning (`coordinate-positioner.test.ts`) | Automated tests checked the origin and calculated center positions for both x-dominated and y-dominated coordinates, including the orientation-dependent `getCenterPosition()` method. The resulting positioning was also visually inspected in the Test-App when rendering grids. | ✅ 6 of 6 tests passed. |
| Hexagon geometry (`geometry.test.ts`) | Automated tests checked that six corner points are created, that the supplied diameter gives the correct width or height depending on orientation, and that geometric bounds are calculated correctly, including empty bounds. The resulting hexagon shapes were also visually inspected in the Test-App. | ✅ 8 of 8 tests passed. |
| Coordinate sorting and layering (`coordinate-layer.test.ts`) | Automated tests checked sorting by y and then x, verified that sorting does not modify the original coordinate array, and checked that z-index values increase correctly between rows. Layered grids were also visually inspected in the Test-App. | ✅ 4 of 4 tests passed. |
| Complete `HexGrid` API and integration (`hex-grid.test.ts`) | Automated tests checked single-hexagon creation, filled grid creation, neighbours, coordinate validation, coordinate ranges, layered coordinates, center positions and grid bounds. Both orientations and larger grids were tested. The Test-App was also used to manually inspect complete x-dominated and y-dominated grids, neighbouring tiles, styling and SVG rendering. | ✅ 16 of 16 tests passed. |

### Overall Result

All **8 of 8 test files passed**, with **67 of 67 automated tests passing in total**. The library was also manually tested through the Test-App to verify its behaviour visually when used in an application.