import { HexGrid } from '../src/index.ts'

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

const hexDiameter = 120
const skeletonWidth = 2
const skeletonHeight = 2

const headingSection = document.createElement('div')
headingSection.append(heading, theory)

sheet.append(
  headingSection,
  createDemonstration('x-dominated'),
  createDemonstration('y-dominated')
)
page.append(sheet)
document.body.prepend(page)

function createDemonstration(orientation: 'x-dominated' | 'y-dominated') {
  const label = orientation === 'x-dominated' ? 'X-dominated' : 'Y-dominated'
  const article = orientation === 'x-dominated' ? 'an' : 'a'

  const section = document.createElement('section')
  section.className = 'grid'

  const figure = document.createElement('div')
  figure.className = 'grid__hex'
  figure.append(createGrid(orientation))

  const title = document.createElement('h2')
  title.textContent = `${label} Hex-grid`

  const explanation = document.createElement('p')
  explanation.textContent = `The following TypeScript code generates ${article} ${label} hexagonal grid using the Midgard Hex Grid library.`

  const code = document.createElement('code')
  fillCode(code, libraryExample(orientation))

  const listing = document.createElement('pre')
  listing.append(code)

  const doc = document.createElement('div')
  doc.className = 'grid__doc'
  doc.append(title, explanation, listing)

  section.append(figure, doc)
  return section
}

function libraryExample(orientation: 'x-dominated' | 'y-dominated') {
  return `const hexDiameter = ${hexDiameter}
const hexGrid = new HexGrid('${orientation}')

const hexagons = hexGrid.createGrid({
  hexDiameter,
  skeletonWidth: ${skeletonWidth},
  skeletonHeight: ${skeletonHeight}
})`
}

function fillCode(code: HTMLElement, source: string) {
  const pattern = /'(?:\\.|[^'])*'|\b(?:const|new)\b|\b\d+\b/g
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

function createGrid(orientation: 'x-dominated' | 'y-dominated') {
  const hexGrid = new HexGrid(orientation)
  const hexagons = hexGrid.createGrid({
    hexDiameter,
    skeletonWidth,
    skeletonHeight
  })
  const bounds = hexGrid.getGridBounds(
    hexagons.map((hexagon) => hexagon.coordinate),
    hexDiameter
  )
  const pad = 2
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `${bounds.minX - pad} ${bounds.minY - pad} ${bounds.width + pad * 2} ${bounds.height + pad * 2}`)
  svg.setAttribute('width', String(bounds.width + pad * 2))
  svg.setAttribute('height', String(bounds.height + pad * 2))

  for (const hexagon of hexagons) {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute('points', hexagon.points.map((point) => `${point.x},${point.y}`).join(' '))
    svg.append(polygon)
  }

  return svg
}
