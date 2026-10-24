import { HexGrid, type LayeredHexagon } from '../src/index.ts'

/**
 * ⬡ X-dominated Hex-grid
 *
 * The following TypeScript code generates an X-dominated hexagonal
 * grid using the Midgard Hex Grid library.
 *
 * An X-dominated hexagon has a pointed top and a pointed bottom,
 * with flat sides on the left and right.
 *
 * The `HexGrid` constructor selects the orientation. Passing
 * `'x-dominated'` creates this pointy-top grid. The same class
 * creates a flat-top grid when given `'y-dominated'`.
 *
 * - `hexDiameter` is the horizontal width of each hexagon, from the
 *   left flat side to the right flat side. This example uses 120.
 * - `skeletonWidth` and `skeletonHeight` are the skeleton dimensions,
 *   counted in skeleton coordinates. This example uses 2 and 2.
 *
 * The skeleton is the rectangular core. It starts at coordinate
 * (2, 2) and steps by two, so these dimensions are the four
 * coordinates (2, 2), (4, 2), (2, 4), and (4, 4). `createGrid()`
 * fills the surrounding hexagons automatically. A 2 × 2 skeleton
 * generates 17 hexagons.
 *
 * Each hexagon in the returned array has its Midgard `coordinate`,
 * its `center`, its six corner `points`, and a `zIndex`. The library
 * does not generate SVG or HTML. Draw `points` with the graphics
 * system the application already uses.
 *
 * Change `hexDiameter` to resize the hexagons. Change
 * `skeletonWidth`, `skeletonHeight`, or both to create another grid
 * size. The library recalculates the geometry.
 *
 * @returns The 17 hexagons of the complete grid, including the
 * surrounding fill, with coordinates and geometry ready to render.
 */
function createXDominatedGrid() {
  const hexDiameter = 120
  const hexGrid = new HexGrid('x-dominated')

  const hexagons = hexGrid.createGrid({
    hexDiameter,
    skeletonWidth: 2,
    skeletonHeight: 2
  })

  return hexagons
}

/**
 * ⬡ Y-dominated Hex-grid
 *
 * The following TypeScript code generates a Y-dominated hexagonal
 * grid using the Midgard Hex Grid library.
 *
 * A Y-dominated hexagon has a flat top and a flat bottom, with
 * points on the left and right.
 *
 * Both orientations use the same `HexGrid` class. The constructor
 * argument selects the orientation: `'y-dominated'` here, and
 * `'x-dominated'` in `createXDominatedGrid`.
 *
 * - For a Y-dominated grid, `hexDiameter` is the vertical hexagon
 *   height, from the flat top to the flat bottom. The library
 *   derives the horizontal width. This example uses 120.
 * - `skeletonWidth` and `skeletonHeight` again describe a 2 × 2
 *   skeleton.
 *
 * `createGrid()` fills the surrounding hexagons automatically and
 * calculates their geometry. The returned array contains 17 hexagons.
 *
 * Each hexagon carries its `coordinate`, `center`, `points`, and
 * `zIndex`. The application decides how to render that geometry.
 * The library does not generate SVG or HTML.
 *
 * Change `hexDiameter` to change the hexagon height, or change the
 * skeleton dimensions to change the grid. Keep the constructor
 * argument `'y-dominated'` to keep the flat-top orientation.
 *
 * @returns The 17 hexagons of the complete grid, including the
 * surrounding fill, with coordinates and geometry ready to render.
 */
function createYDominatedGrid() {
  const hexDiameter = 120
  const hexGrid = new HexGrid('y-dominated')

  const hexagons = hexGrid.createGrid({
    hexDiameter,
    skeletonWidth: 2,
    skeletonHeight: 2
  })

  return hexagons
}

/* =====================================================================
 * PRESENTATION — SVG, HTML AND CSS
 *
 * The functions above generate the hexagons. Everything below only
 * displays those results.
 * ===================================================================== */

const xDominatedHexagons = createXDominatedGrid()
const yDominatedHexagons = createYDominatedGrid()

const xDominatedSource = `function createXDominatedGrid() {
  const hexDiameter = 120
  const hexGrid = new HexGrid('x-dominated')

  const hexagons = hexGrid.createGrid({
    hexDiameter,
    skeletonWidth: 2,
    skeletonHeight: 2
  })

  return hexagons
}`

const yDominatedSource = `function createYDominatedGrid() {
  const hexDiameter = 120
  const hexGrid = new HexGrid('y-dominated')

  const hexagons = hexGrid.createGrid({
    hexDiameter,
    skeletonWidth: 2,
    skeletonHeight: 2
  })

  return hexagons
}`

const styles = `
:root {
  --page-navy: #0e1c2e;
  --panel-parchment: #c7a47f;
  --panel-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
  --ink-strong: #2a1a0e;
  --ink-body: #3d2918;
  --ink-soft: #4a3120;
  --rule-brown: #7a4e2d;
}

html {
  font-size: 17px;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--page-navy);
  color: var(--ink-body);
  font-family: Palatino, 'Palatino Linotype', 'Iowan Old Style', Georgia, serif;
  line-height: 1.45;
}

.page {
  padding: 32px 20px 48px;
}

.sheet {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 56px;
  background: var(--panel-parchment);
  box-shadow: var(--panel-shadow);
}

h1 {
  margin: 0;
  color: var(--ink-strong);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.15;
  text-align: center;
}

.sheet__minimal {
  display: block;
  margin: 8px 0 0;
  color: var(--ink-soft);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  margin-top: 36px;
}

.grid__hex {
  display: flex;
  justify-content: center;
}

.grid polygon {
  fill: #f4ead8;
  stroke: #2a1a0e;
  stroke-width: 2;
  stroke-linejoin: round;
}

.grid__doc h2 {
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule-brown);
  color: var(--ink-strong);
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
}

.grid__doc p {
  margin: 0;
}

.grid pre {
  margin: 18px 0 0;
  padding: 22px 24px;
  overflow-x: auto;
  border-radius: 10px;
  background: var(--page-navy);
  box-shadow: 0 10px 24px rgba(14, 28, 46, 0.18);
  color: #f4ead8;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 15px;
  line-height: 1.6;
}

.grid code {
  font-family: inherit;
}

.tok-keyword {
  color: #e7c98a;
}

.tok-string {
  color: #c9e2a6;
}

.tok-number {
  color: #9fd4f0;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .sheet {
    padding: 36px 22px 40px;
  }

  h1 {
    font-size: 32px;
  }
}
`

const style = document.createElement('style')
style.textContent = styles
document.head.append(style)

const page = document.createElement('main')
page.className = 'page'

const sheet = document.createElement('article')
sheet.className = 'sheet'

const heading = document.createElement('h1')
heading.textContent = 'Midgard Hex Grid'

const theory = document.createElement('a')
theory.className = 'sheet__minimal'
theory.href = '/index.html'
theory.textContent = 'Theory Demonstration'

const headingSection = document.createElement('div')
headingSection.append(heading, theory)

sheet.append(
  headingSection,
  createDemonstration(
    xDominatedHexagons,
    'X-dominated Hex-grid',
    'The following TypeScript code generates an X-dominated hexagonal grid using the Midgard Hex Grid library.',
    xDominatedSource
  ),
  createDemonstration(
    yDominatedHexagons,
    'Y-dominated Hex-grid',
    'The following TypeScript code generates a Y-dominated hexagonal grid using the Midgard Hex Grid library.',
    yDominatedSource
  )
)
page.append(sheet)
document.body.prepend(page)

function createDemonstration(
  hexagons: LayeredHexagon[],
  title: string,
  explanation: string,
  source: string
) {
  const section = document.createElement('section')
  section.className = 'grid'

  const figure = document.createElement('div')
  figure.className = 'grid__hex'
  figure.append(renderHexagons(hexagons))

  const heading = document.createElement('h2')
  heading.textContent = title

  const text = document.createElement('p')
  text.textContent = explanation

  const code = document.createElement('code')
  fillCode(code, source)

  const listing = document.createElement('pre')
  listing.append(code)

  const doc = document.createElement('div')
  doc.className = 'grid__doc'
  doc.append(heading, text, listing)

  section.append(figure, doc)
  return section
}

function fillCode(code: HTMLElement, source: string) {
  const pattern = /'(?:\\.|[^'])*'|\b(?:const|function|new|return)\b|\b\d+\b/g
  let cursor = 0

  for (const match of source.matchAll(pattern)) {
    const token = match[0]
    const index = match.index
    if (token === undefined || index === undefined) continue
    if (index > cursor) code.append(source.slice(cursor, index))

    const span = document.createElement('span')
    span.className = token.startsWith("'")
      ? 'tok-string'
      : /^\d+$/.test(token)
        ? 'tok-number'
        : 'tok-keyword'
    span.textContent = token
    code.append(span)
    cursor = index + token.length
  }

  if (cursor < source.length) code.append(source.slice(cursor))
}

function renderHexagons(hexagons: LayeredHexagon[]) {
  const firstPoint = hexagons[0]?.points[0]

  if (firstPoint === undefined) {
    throw new Error('The generated grid did not contain a hexagon.')
  }

  let minX = firstPoint.x
  let minY = firstPoint.y
  let maxX = firstPoint.x
  let maxY = firstPoint.y

  for (const hexagon of hexagons) {
    for (const point of hexagon.points) {
      if (point.x < minX) minX = point.x
      if (point.y < minY) minY = point.y
      if (point.x > maxX) maxX = point.x
      if (point.y > maxY) maxY = point.y
    }
  }

  const pad = 2
  const width = maxX - minX + pad * 2
  const height = maxY - minY + pad * 2
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${width} ${height}`)
  svg.setAttribute('width', String(width))
  svg.setAttribute('height', String(height))

  for (const hexagon of hexagons) {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute('points', hexagon.points.map((point) => `${point.x},${point.y}`).join(' '))
    svg.append(polygon)
  }

  return svg
}
