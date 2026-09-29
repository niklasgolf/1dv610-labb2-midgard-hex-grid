# Midgard Hex Grid

Midgard Hex Grid is a small reusable TypeScript library for creating and working with hexagonal grids.

The library supports both x-dominated and y-dominated hex grids and handles the coordinate system, neighbour calculations, positioning and hexagon geometry. Its purpose is to let another programmer work with hexagonal grids without having to implement these calculations themselves.

## Features

- Create x-dominated and y-dominated hex grids
- Create a single hexagon
- Generate complete grids from a rectangular skeleton
- Calculate the six neighbours of a coordinate
- Validate Midgard coordinates
- Calculate center positions
- Calculate the six corner points of a hexagon
- Calculate the outer bounds of a grid
- Generate coordinate ranges
- Generate layered coordinates with z-index values for rendering

## Requirements

- TypeScript
- JavaScript environment with ES modules

The library has no runtime dependencies.

Development uses:

- TypeScript 7
- Vitest 5

## Installation

Clone the repository and install the development dependencies:

```bash
npm install
```

Build the library:

```bash
npm run build
```

The compiled JavaScript and TypeScript declarations are generated in the `dist` directory.

## Basic usage

The main class is `HexGrid`.

Create a grid by first choosing its orientation:

```ts
import { HexGrid } from './dist/index.js'

const grid = new HexGrid('x-dominated')
```

The orientation can be:

```ts
'x-dominated'
```

or:

```ts
'y-dominated'
```

### Create a single hexagon

```ts
const grid = new HexGrid('x-dominated')

const hexagon = grid.createSingleHexagon({
  hexDiameter: 100
})
```

The returned hexagon contains:

- its Midgard coordinate
- its center position
- its six corner points

These values can, for example, be used by an application to render the hexagon as SVG.

### Create a complete grid

```ts
const grid = new HexGrid('x-dominated')

const hexagons = grid.createGrid({
  hexDiameter: 100,
  skeletonWidth: 3,
  skeletonHeight: 2
})
```

`skeletonWidth` and `skeletonHeight` describe the rectangular skeleton around which the complete grid is generated.

The library automatically fills the surrounding coordinates and returns the hexagons in rendering order with calculated z-index values.

### Y-dominated grid

The same API can be used for the other orientation:

```ts
const grid = new HexGrid('y-dominated')

const hexagons = grid.createGrid({
  hexDiameter: 100,
  skeletonWidth: 3,
  skeletonHeight: 2
})
```

The grid orientation controls the coordinate relationships, positioning and geometry internally.

## Neighbours

The six neighbouring coordinates can be calculated through the grid:

```ts
const neighbours = grid.getNeighbours({
  x: 2,
  y: 2
})
```

The result depends on whether the `HexGrid` is x-dominated or y-dominated.

## Coordinate validation

A coordinate can be checked before it is used:

```ts
const valid = grid.isValidCoordinate({
  x: 2,
  y: 2
})
```

## Lower-level API

`HexGrid` provides the simplest interface for most uses.

The library also exports lower-level classes for programmers who want to work directly with individual parts of the grid system, including:

- `CoordinateValidator`
- `NeighbourCalculator`
- `HexagonGeometry`
- `CoordinatePositioner`
- `CoordinateRange`
- `CoordinateRangeFiller`
- `CoordinateLayer`

The public TypeScript types are exported from `src/index.ts`.

## Testing

The mathematical and coordinate logic is tested with automated unit tests using Vitest.

Run all automated tests with:

```bash
npx vitest run
```

The library is also tested visually with a separate graphical Test-App. This makes it possible to verify that the calculated coordinates and geometry produce the expected SVG hexagons and grid layouts.

See [`TEST_REPORT.md`](./TEST_REPORT.md) for the test documentation and results.

## Development commands

Check the TypeScript code without producing build files:

```bash
npm run check
```

Build the library:

```bash
npm run build
```

Run the automated tests:

```bash
npx vitest run
```

## Version

Current version: `1.0.0`

The version is also available from the library:

```ts
import { MIDGARD_HEX_GRID_VERSION } from './dist/index.js'
```

## License

ISC