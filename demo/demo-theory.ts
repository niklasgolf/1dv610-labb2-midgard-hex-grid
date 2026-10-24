import { CoordinateLayer, HexGrid } from '../src/index.ts'

import type { Coordinate, Point } from '../src/index.ts'

const theoryStyles = `
:root {
  --page-navy: #0e1c2e;
  --panel-parchment: #c7a47f;
  --panel-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
  --ink-strong: #2a1a0e;
  --ink-body: #3d2918;
  --ink-soft: #4a3120;
  --rule-brown: #7a4e2d;

  --fill-valid: #f4ead8;
  --fill-edge: #909090;
  --fill-mixed: #505050;
  --fill-neighbour: #788d42;
  --fill-center: #a9b965;
  --fill-forbidden-cell: #e5a3a5;

  --stroke-boundary: #8e2e2a;
  --stroke-axis: #4a433a;
  --stroke-neighbour-mark: #1b6840;
  --stroke-overlay: #75c9f1;
  --fill-movement: #102b20;
  --fill-forbidden: #7a2020;
  --stroke-forbidden: #ff2020;
  --fill-center-mark: #ffe44d;
  --label-marked: #d10f0f;
  --stroke-offset-mark: #d52c36;

  --label-origin: #fff1ea;
  --label-near-origin: #1a120c;
  --label-outer-pair: #a33b48;
  --label-neighbour: #143f24;
  --label-scattered: #7a2f68;
  --label-far-corner: #ffe7a3;

  --label-hex-axis: #4a5614;
  --label-hex-diagonal: #1a4c84;
  --label-hex-row: #143f24;
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

.sheet-section {
  display: flow-root;
  width: 100%;
  margin: 0;
}

.sheet__intro {
  margin-bottom: 36px;
}

#y-dominated {
  padding-top: 36px;
}

h1 {
  margin: 0;
  color: var(--ink-strong);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.15;
  text-align: center;
}

.diagrams {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 32px;
}

.diagram {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

h2 {
  width: 100%;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule-brown);
  color: var(--ink-strong);
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
}

.stage {
  position: relative;
  max-width: 100%;
}

.grid,
.hexes {
  display: block;
  max-width: none;
  height: auto;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cell-label,
.hex-label {
  font-family: Palatino, 'Palatino Linotype', 'Iowan Old Style', Georgia, serif;
  font-weight: 700;
}

@media (max-width: 980px) {
  .sheet {
    padding: 36px 22px 40px;
  }

  h1 {
    font-size: 32px;
  }

  .diagrams {
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  .diagram {
    width: min(100%, 640px);
  }
}
`

installTheoryStyles()

const theory = requireHtmlElement(document, '#theory')
const xSection = requireHtmlElement(document, '#x-dominated')
const ySection = requireHtmlElement(document, '#y-dominated')

// Both illustrations are authored at this cell size. The wider
// Y-dominated row decides the one scale that makes them visible.
const sharedCellSize = 76

renderTheory(theory)
renderXDominated(xSection)
renderYDominated(ySection)

function installTheoryStyles() {
  if (document.getElementById('midgard-theory-styles') !== null) {
    return
  }

  const style = document.createElement('style')
  style.id = 'midgard-theory-styles'
  style.textContent = theoryStyles
  document.head.append(style)
}

function renderTheory(_root: HTMLElement) {
}

function requireHtmlElement(scope: ParentNode, selector: string) {
  const element = scope.querySelector(selector)

  if (!(element instanceof HTMLElement)) {
    throw new Error('Demo containers are missing.')
  }

  return element
}

function sharedDemonstrationScale() {
  const diagrams = ySection.querySelector('.diagrams')

  if (!(diagrams instanceof HTMLElement)) {
    return 1
  }

  const sideBySide = getComputedStyle(diagrams).flexDirection !== 'column'
  const gap = Number.parseFloat(getComputedStyle(diagrams).columnGap) || 0
  const available = diagrams.clientWidth
  const fitted = yDominatedUserWidth()
  const naturalWidth = sideBySide
    ? fitted.leftWidth + fitted.rightWidth + gap
    : Math.max(fitted.leftWidth, fitted.rightWidth)

  if (naturalWidth <= 0 || available <= 0) {
    return 1
  }

  return Math.min(1, available / naturalWidth)
}

function yDominatedUserWidth() {
  const coordinates: Coordinate[] = []

  for (let x = 1; x <= 5; x += 1) {
    for (let y = 0; y <= 6; y += 1) {
      if ((x + y) % 2 === 0) {
        coordinates.push({ x, y })
      }
    }
  }

  const bounds = new HexGrid('y-dominated').getGridBounds(
    coordinates,
    sharedCellSize * 2
  )
  const pad = 8

  return {
    leftWidth: 7 * sharedCellSize * Math.sqrt(3),
    rightWidth: bounds.width + pad * 2
  }
}

function renderXDominated(root: HTMLElement) {
  const svgNs = 'http://www.w3.org/2000/svg'
  const sqrt3 = Math.sqrt(3)
  const columns = 7
  const rows = 7
  const cellWidth = sharedCellSize
  const cellHeight = cellWidth * sqrt3

  // One x-dominated step of 2 is a horizontal neighbour.
  // That distance is the hexagon width, and it equals two rectangle columns.
  const hexDiameter = cellWidth * 2

  const grid = new HexGrid('x-dominated')
  const centerCoordinate = { x: 3, y: 3 }
  const neighbourKeys = new Set(
    grid.getNeighbours(centerCoordinate).map((coordinate) => keyOf(coordinate))
  )

  const labeledXDom = new Set([
    '0,0',
    '1,1',
    '5,1',
    '0,2',
    '2,2',
    '4,2',
    '6,2',
    '1,3',
    '3,1',
    '3,3',
    '3,5',
    '5,3',
    '0,4',
    '2,4',
    '4,4',
    '6,4',
    '1,5',
    '5,5',
    '6,6'
  ])

  const xDomLabelColor: Record<string, string> = {
    '0,0': 'var(--label-origin)',
    '1,1': 'var(--label-near-origin)',
    '5,1': 'var(--label-scattered)',
    '0,2': 'var(--label-outer-pair)',
    '6,2': 'var(--label-outer-pair)',
    '2,2': 'var(--label-neighbour)',
    '4,2': 'var(--label-neighbour)',
    '1,3': 'var(--label-neighbour)',
    '3,1': 'var(--label-marked)',
    '3,3': 'var(--label-neighbour)',
    '3,5': 'var(--label-marked)',
    '5,3': 'var(--label-neighbour)',
    '0,4': 'var(--label-scattered)',
    '2,4': 'var(--label-neighbour)',
    '4,4': 'var(--label-neighbour)',
    '6,4': 'var(--label-scattered)',
    '1,5': 'var(--label-scattered)',
    '5,5': 'var(--label-scattered)',
    '6,6': 'var(--label-far-corner)'
  }

  const neighbourCircleRadius = cellWidth * 0.34
  const arrowTail = neighbourCircleRadius + 1 + 1.5
  const arrowTip = 122
  const arrowHeadLength = 36
  const movementArrow = movementArrowTo(arrowTip)
  const overlayCoordinates = [
    centerCoordinate,
    ...grid.getNeighbours(centerCoordinate)
  ]
  const forbiddenMoves = [
    { x: 3, y: 1 },
    { x: 3, y: 5 }
  ]

  const xdom = requireHtmlElement(root, '#xdom')
  const hexgrid = requireHtmlElement(root, '#x-hexgrid')

  drawXDom(xdom)
  drawHexGrid(hexgrid)
  alignHexGrid()
  window.addEventListener('resize', alignHexGrid)

  function drawXDom(container: Element) {
    const width = columns * cellWidth
    const height = rows * cellHeight
    const board = createSvg(width, height)
    board.setAttribute('class', 'grid')

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const rect = createSvgElement('rect')
        rect.setAttribute('x', String(x * cellWidth))
        rect.setAttribute('y', String(y * cellHeight))
        rect.setAttribute('width', String(cellWidth))
        rect.setAttribute('height', String(cellHeight))
        rect.setAttribute('fill', rectangleFill(x, y))
        rect.setAttribute('stroke', 'var(--stroke-boundary)')
        rect.setAttribute('stroke-width', '2')
        board.append(rect)
      }
    }

    board.append(createNeighbourCircle(cellCenter(centerCoordinate.x, centerCoordinate.y)))

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const id = keyOf({ x, y })

        if (!labeledXDom.has(id)) {
          continue
        }

        const center = cellCenter(x, y)
        const color = xDomLabelColor[id] ?? 'var(--ink-strong)'

        if (neighbourKeys.has(id) || isForbiddenCoordinate({ x, y })) {
          board.append(createNeighbourLabel(`${x},${y}`, { x, y }, center, color))
          continue
        }

        board.append(createLabel(`${x},${y}`, center, color))
      }
    }

    const overlay = createSvg(width, height)
    overlay.setAttribute('class', 'overlay')
    const shifted = createSvgElement('g')
    shifted.setAttribute(
      'transform',
      `translate(${cellWidth / 2} ${cellHeight / 2})`
    )

    for (const coordinate of overlayCoordinates) {
      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const polygon = createPolygon(grid.getHexagonPoints(center, hexDiameter))
      polygon.setAttribute('fill', 'none')
      polygon.setAttribute('stroke', 'var(--stroke-overlay)')
      polygon.setAttribute('stroke-width', '3')
      polygon.setAttribute('stroke-linejoin', 'round')
      shifted.append(polygon)
    }

    overlay.append(shifted)
    container.append(board, overlay)
  }

  function drawHexGrid(container: Element) {
    const coordinates = hexCoordinates()
    const layered = new CoordinateLayer(coordinates).getLayeredCoordinates()
    const bounds = grid.getGridBounds(coordinates, hexDiameter)
    const pad = 8
    const width = bounds.width + pad * 2
    const height = bounds.height + pad * 2
    const board = createSvg(width, height)
    board.setAttribute('class', 'hexes')
    board.setAttribute(
      'viewBox',
      `${bounds.minX - pad} ${bounds.minY - pad} ${width} ${height}`
    )

    const surrounding = layered.filter((coordinate) => !isCentralHex(coordinate))
    const central = layered.filter((coordinate) => isCentralHex(coordinate))

    for (const coordinate of [...surrounding, ...central]) {
      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const polygon = createPolygon(grid.getHexagonPoints(center, hexDiameter))
      polygon.setAttribute('fill', hexFill(coordinate))
      polygon.setAttribute('stroke', hexStroke(coordinate))
      polygon.setAttribute('stroke-width', isCentralHex(coordinate) ? '3' : '2')
      polygon.setAttribute('stroke-linejoin', 'round')
      board.append(polygon)
    }

    drawMovementArrows(board)
    drawForbiddenArrows(board)
    board.append(createNeighbourCircle(
      grid.getCenterPosition(centerCoordinate, hexDiameter)
    ))

    for (const coordinate of layered) {
      if (!isLabeledHex(coordinate)) {
        continue
      }

      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const color = hexLabelColor(coordinate)

      if (isForbiddenCoordinate(coordinate)) {
        board.append(createNeighbourLabel(
          `${coordinate.x},${coordinate.y}`,
          coordinate,
          center,
          color
        ))
        continue
      }

      board.append(createLabel(
        `${coordinate.x},${coordinate.y}`,
        center,
        color
      ))
    }

    container.append(board)
  }

  function hexCoordinates() {
    const coordinates: Coordinate[] = []

    for (let y = 1; y <= 5; y += 1) {
      for (let x = 0; x <= 6; x += 1) {
        if ((x + y) % 2 === 0) {
          coordinates.push({ x, y })
        }
      }
    }

    return coordinates
  }

  function rectangleFill(x: number, y: number) {
    const id = keyOf({ x, y })

    if (id === '3,3') {
      return 'var(--fill-center)'
    }

    if (isForbiddenCoordinate({ x, y })) {
      return 'var(--fill-forbidden-cell)'
    }

    if (neighbourKeys.has(id)) {
      return 'var(--fill-neighbour)'
    }

    if ((x + y) % 2 === 0) {
      if (y === 0 || y === 6) {
        return 'var(--fill-edge)'
      }

      return 'var(--fill-valid)'
    }

    return 'var(--fill-mixed)'
  }

  function isCentralHex(coordinate: Coordinate) {
    return keyOf(coordinate) === '3,3' || neighbourKeys.has(keyOf(coordinate))
  }

  function hexStroke(coordinate: Coordinate) {
    if (isCentralHex(coordinate)) {
      return 'var(--stroke-overlay)'
    }

    return 'var(--stroke-boundary)'
  }

  function hexFill(coordinate: Coordinate) {
    const id = keyOf(coordinate)

    if (id === '3,3') {
      return 'var(--fill-center)'
    }

    if (isForbiddenCoordinate(coordinate)) {
      return 'var(--fill-forbidden-cell)'
    }

    if (neighbourKeys.has(id)) {
      return 'var(--fill-neighbour)'
    }

    return 'var(--fill-valid)'
  }

  function hexLabelColor(coordinate: Coordinate) {
    if (coordinate.x === 3 && (coordinate.y === 1 || coordinate.y === 5)) {
      return 'var(--label-marked)'
    }

    if (coordinate.y === 1 || coordinate.y === 5) {
      return 'var(--label-hex-axis)'
    }

    if (coordinate.x === 2 || coordinate.x === 4) {
      return 'var(--label-hex-diagonal)'
    }

    return 'var(--label-hex-row)'
  }

  function isLabeledHex(coordinate: Coordinate) {
    if (coordinate.x === 3 && coordinate.y % 2 === 1) {
      return coordinate.y >= 1 && coordinate.y <= 5
    }

    if (neighbourKeys.has(keyOf(coordinate))) {
      return true
    }

    return false
  }

  function createNeighbourCircle(center: Point, radius = neighbourCircleRadius) {
    const circle = createSvgElement('circle')
    circle.setAttribute('cx', String(center.x))
    circle.setAttribute('cy', String(center.y))
    circle.setAttribute('r', String(radius))
    circle.setAttribute('fill', 'var(--fill-center-mark)')
    circle.setAttribute('stroke', 'var(--stroke-neighbour-mark)')
    circle.setAttribute('stroke-width', '2')
    return circle
  }

  function createNeighbourLabel(
    text: string,
    coordinate: Coordinate,
    center: Point,
    color: string
  ) {
    const group = createSvgElement('g')
    const coordinateLabel = createLabel(
      text,
      { x: center.x, y: center.y - 11 },
      color
    )
    coordinateLabel.setAttribute('font-size', '20')
    const offsetLabel = createLabel(
      formatOffset(coordinate),
      { x: center.x, y: center.y + 11 },
      color
    )
    offsetLabel.setAttribute('font-size', '14')
    group.append(coordinateLabel, offsetLabel)

    if (isForbiddenCoordinate(coordinate)) {
      group.append(createForbiddenOffsetMark({ x: center.x, y: center.y + 11 }))
    }

    return group
  }

  function isForbiddenCoordinate(coordinate: Coordinate) {
    return forbiddenMoves.some((move) => keyOf(move) === keyOf(coordinate))
  }

  function createForbiddenOffsetMark(center: Point) {
    const mark = createSvgElement('g')
    mark.setAttribute('class', 'offset-mark')
    const scale = 14 / 24
    const strokes: ReadonlyArray<readonly [number, number, number, number]> = [
      [-17, -22, 12, 7],
      [9, -22, -17, 7]
    ]

    for (const [x1, y1, x2, y2] of strokes) {
      const line = createSvgElement('line')
      line.setAttribute('x1', String(center.x + x1 * scale))
      line.setAttribute('y1', String(center.y + y1 * scale))
      line.setAttribute('x2', String(center.x + x2 * scale))
      line.setAttribute('y2', String(center.y + y2 * scale))
      line.setAttribute('stroke', 'var(--stroke-offset-mark)')
      line.setAttribute('stroke-width', String(2.6 * scale))
      line.setAttribute('stroke-linecap', 'round')
      mark.append(line)
    }

    return mark
  }

  function formatOffset(coordinate: Coordinate) {
    const dx = coordinate.x - centerCoordinate.x
    const dy = coordinate.y - centerCoordinate.y
    return `(${signed(dx)},${signed(dy)})`
  }

  function signed(value: number) {
    return value > 0 ? `+${value}` : String(value)
  }

  function drawMovementArrows(layer: SVGElement) {
    const origin = grid.getCenterPosition(centerCoordinate, hexDiameter)

    for (const neighbour of grid.getNeighbours(centerCoordinate)) {
      const target = grid.getCenterPosition(neighbour, hexDiameter)
      layer.append(createMovementArrow(origin, target))
    }
  }

  function drawForbiddenArrows(layer: SVGElement) {
    const origin = grid.getCenterPosition(centerCoordinate, hexDiameter)
    const tip = forbiddenArrowTip(origin)
    const points = movementArrowTo(tip)

    for (const coordinate of forbiddenMoves) {
      const target = grid.getCenterPosition(coordinate, hexDiameter)
      layer.append(createMovementArrow(origin, target, 'var(--fill-forbidden)', points))
    }

    for (const coordinate of forbiddenMoves) {
      const target = grid.getCenterPosition(coordinate, hexDiameter)
      layer.append(createForbiddenCross(origin, target, tip))
    }
  }

  function forbiddenArrowTip(origin: Point) {
    const neighbour = grid.getNeighbours(centerCoordinate)[0]
    const blocked = forbiddenMoves[0]

    if (neighbour === undefined || blocked === undefined) {
      return arrowTip
    }

    const neighbourDistance = distance(
      origin,
      grid.getCenterPosition(neighbour, hexDiameter)
    )
    const blockedDistance = distance(
      origin,
      grid.getCenterPosition(blocked, hexDiameter)
    )
    return blockedDistance - (neighbourDistance - arrowTip)
  }

  function movementArrowTo(tip: number) {
    const headBase = tip - arrowHeadLength
    return [
      { x: arrowTail, y: -4 },
      { x: headBase, y: -4 },
      { x: headBase, y: -12.8 },
      { x: tip, y: 0 },
      { x: headBase, y: 12.8 },
      { x: headBase, y: 4 },
      { x: arrowTail, y: 4 }
    ]
  }

  function createMovementArrow(
    origin: Point,
    target: Point,
    fill = 'var(--fill-movement)',
    points = movementArrow
  ) {
    const arrow = createSvgElement('g')
    arrow.setAttribute('class', 'movement-arrow')
    arrow.setAttribute('transform', movementTransform(origin, target))
    const polygon = createPolygon(points)
    polygon.setAttribute('fill', fill)
    arrow.append(polygon)
    return arrow
  }

  function createForbiddenCross(origin: Point, target: Point, tip: number) {
    const cross = createSvgElement('g')
    cross.setAttribute('class', 'forbidden-cross')
    cross.setAttribute('transform', movementTransform(origin, target))
    const center = (arrowTail + tip) / 2
    const arm = 18
    cross.append(
      createForbiddenLine(center - arm, -arm, center + arm, arm),
      createForbiddenLine(center + arm, -arm, center - arm, arm)
    )
    return cross
  }

  function createForbiddenLine(x1: number, y1: number, x2: number, y2: number) {
    const line = createSvgElement('line')
    line.setAttribute('x1', String(x1))
    line.setAttribute('y1', String(y1))
    line.setAttribute('x2', String(x2))
    line.setAttribute('y2', String(y2))
    line.setAttribute('stroke', 'var(--stroke-forbidden)')
    line.setAttribute('stroke-width', '5')
    line.setAttribute('stroke-linecap', 'round')
    return line
  }

  function distance(from: Point, to: Point) {
    return Math.hypot(to.x - from.x, to.y - from.y)
  }

  function movementTransform(origin: Point, target: Point) {
    const degrees = Math.atan2(target.y - origin.y, target.x - origin.x) * 180 / Math.PI
    return `translate(${origin.x} ${origin.y}) rotate(${degrees})`
  }

  function createLabel(text: string, center: Point, color: string) {
    const label = createSvgElement('text')
    label.setAttribute('class', 'cell-label')
    label.setAttribute('font-size', '17')
    label.setAttribute('x', String(center.x))
    label.setAttribute('y', String(center.y))
    label.setAttribute('fill', color)
    label.setAttribute('text-anchor', 'middle')
    label.setAttribute('dominant-baseline', 'central')
    label.textContent = text
    return label
  }

  function createPolygon(points: Point[]) {
    const polygon = createSvgElement('polygon')
    polygon.setAttribute(
      'points',
      points.map((point) => `${point.x},${point.y}`).join(' ')
    )
    return polygon
  }

  function cellCenter(x: number, y: number): Point {
    return {
      x: (x + 0.5) * cellWidth,
      y: (y + 0.5) * cellHeight
    }
  }

  function createSvg(width: number, height: number) {
    const svg = createSvgElement('svg')
    svg.setAttribute('width', String(width))
    svg.setAttribute('height', String(height))
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    return svg
  }

  function createSvgElement<Name extends keyof SVGElementTagNameMap>(name: Name) {
    return document.createElementNS(svgNs, name)
  }

  function keyOf(coordinate: Coordinate) {
    return `${coordinate.x},${coordinate.y}`
  }

  function alignHexGrid() {
    const diagrams = root.querySelector('.diagrams')
    const leftSvg = xdom.querySelector('.grid')
    const rightSvg = hexgrid.querySelector('.hexes')

    if (
      !(diagrams instanceof HTMLElement) ||
      !(leftSvg instanceof SVGSVGElement) ||
      !(rightSvg instanceof SVGSVGElement)
    ) {
      return
    }

    const sideBySide = getComputedStyle(diagrams).flexDirection !== 'column'
    const leftWidth = leftSvg.width.baseVal.value
    const leftHeight = leftSvg.height.baseVal.value
    const rightWidth = rightSvg.width.baseVal.value
    const rightHeight = rightSvg.height.baseVal.value
    const scale = sharedDemonstrationScale()

    leftSvg.style.width = `${leftWidth * scale}px`
    leftSvg.style.height = `${leftHeight * scale}px`
    rightSvg.style.width = `${rightWidth * scale}px`
    rightSvg.style.height = `${rightHeight * scale}px`

    hexgrid.style.marginTop = '0'

    if (!sideBySide) {
      return
    }

    const leftCenter = cellCenter(centerCoordinate.x, centerCoordinate.y)
    const rightCenter = grid.getCenterPosition(centerCoordinate, hexDiameter)
    const leftPoint = toScreen(leftSvg, leftCenter)
    const rightPoint = toScreen(rightSvg, rightCenter)

    if (leftPoint === null || rightPoint === null) {
      return
    }

    hexgrid.style.marginTop = `${leftPoint.y - rightPoint.y}px`
  }

  function toScreen(svg: SVGSVGElement, point: Point) {
    const matrix = svg.getScreenCTM()

    if (matrix === null) {
      return null
    }

    const svgPoint = svg.createSVGPoint()
    svgPoint.x = point.x
    svgPoint.y = point.y
    return svgPoint.matrixTransform(matrix)
  }
}

function renderYDominated(root: HTMLElement) {
  const svgNs = 'http://www.w3.org/2000/svg'
  const sqrt3 = Math.sqrt(3)
  const columns = 7
  const rows = 7
  const cellHeight = sharedCellSize
  const cellWidth = cellHeight * sqrt3

  // One y-dominated step of 2 is a vertical neighbour.
  // That distance is the hexagon height, and it equals two rectangle rows.
  const hexDiameter = cellHeight * 2

  const grid = new HexGrid('y-dominated')
  const centerCoordinate = { x: 3, y: 3 }
  const neighbourKeys = new Set(
    grid.getNeighbours(centerCoordinate).map((coordinate) => keyOf(coordinate))
  )

  const labeledYDom = new Set([
    '0,0',
    '1,1',
    '1,5',
    '2,0',
    '2,2',
    '2,4',
    '2,6',
    '3,1',
    '1,3',
    '3,3',
    '5,3',
    '3,5',
    '4,0',
    '4,2',
    '4,4',
    '4,6',
    '5,1',
    '5,5',
    '6,6'
  ])

  const yDomLabelColor: Record<string, string> = {
    '0,0': 'var(--label-origin)',
    '1,1': 'var(--label-near-origin)',
    '1,5': 'var(--label-scattered)',
    '2,0': 'var(--label-outer-pair)',
    '2,6': 'var(--label-outer-pair)',
    '2,2': 'var(--label-neighbour)',
    '2,4': 'var(--label-neighbour)',
    '3,1': 'var(--label-neighbour)',
    '1,3': 'var(--label-marked)',
    '3,3': 'var(--label-neighbour)',
    '5,3': 'var(--label-marked)',
    '3,5': 'var(--label-neighbour)',
    '4,0': 'var(--label-scattered)',
    '4,2': 'var(--label-neighbour)',
    '4,4': 'var(--label-neighbour)',
    '4,6': 'var(--label-scattered)',
    '5,1': 'var(--label-scattered)',
    '5,5': 'var(--label-scattered)',
    '6,6': 'var(--label-far-corner)'
  }

  const neighbourCircleRadius = cellHeight * 0.34
  const arrowTail = neighbourCircleRadius + 1 + 1.5
  const arrowTip = 122
  const arrowHeadLength = 36
  const movementArrow = movementArrowTo(arrowTip)
  const overlayCoordinates = [
    centerCoordinate,
    ...grid.getNeighbours(centerCoordinate)
  ]
  const forbiddenMoves = [
    { x: 1, y: 3 },
    { x: 5, y: 3 }
  ]

  const ydom = requireHtmlElement(root, '#ydom')
  const hexgrid = requireHtmlElement(root, '#y-hexgrid')

  drawYDom(ydom)
  drawHexGrid(hexgrid)
  alignHexGrid()
  window.addEventListener('resize', alignHexGrid)

  function drawYDom(container: Element) {
    const width = columns * cellWidth
    const height = rows * cellHeight
    const board = createSvg(width, height)
    board.setAttribute('class', 'grid')

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const rect = createSvgElement('rect')
        rect.setAttribute('x', String(x * cellWidth))
        rect.setAttribute('y', String(y * cellHeight))
        rect.setAttribute('width', String(cellWidth))
        rect.setAttribute('height', String(cellHeight))
        rect.setAttribute('fill', rectangleFill(x, y))
        rect.setAttribute('stroke', 'var(--stroke-boundary)')
        rect.setAttribute('stroke-width', '2')
        board.append(rect)
      }
    }

    board.append(createNeighbourCircle(cellCenter(centerCoordinate.x, centerCoordinate.y)))

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const id = keyOf({ x, y })

        if (!labeledYDom.has(id)) {
          continue
        }

        const center = cellCenter(x, y)
        const color = yDomLabelColor[id] ?? 'var(--ink-strong)'

        if (neighbourKeys.has(id) || isForbiddenCoordinate({ x, y })) {
          board.append(createNeighbourLabel(`${x},${y}`, { x, y }, center, color))
          continue
        }

        board.append(createLabel(`${x},${y}`, center, color))
      }
    }

    const overlay = createSvg(width, height)
    overlay.setAttribute('class', 'overlay')
    const shifted = createSvgElement('g')
    shifted.setAttribute(
      'transform',
      `translate(${cellWidth / 2} ${cellHeight / 2})`
    )

    for (const coordinate of overlayCoordinates) {
      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const polygon = createPolygon(grid.getHexagonPoints(center, hexDiameter))
      polygon.setAttribute('fill', 'none')
      polygon.setAttribute('stroke', 'var(--stroke-overlay)')
      polygon.setAttribute('stroke-width', '3')
      polygon.setAttribute('stroke-linejoin', 'round')
      shifted.append(polygon)
    }

    overlay.append(shifted)
    container.append(board, overlay)
  }

  function drawHexGrid(container: Element) {
    const coordinates = hexCoordinates()
    const layered = new CoordinateLayer(coordinates).getLayeredCoordinates()
    const bounds = grid.getGridBounds(coordinates, hexDiameter)
    const pad = 8
    const width = bounds.width + pad * 2
    const height = bounds.height + pad * 2
    const board = createSvg(width, height)
    board.setAttribute('class', 'hexes')
    board.setAttribute(
      'viewBox',
      `${bounds.minX - pad} ${bounds.minY - pad} ${width} ${height}`
    )

    const surrounding = layered.filter((coordinate) => !isCentralHex(coordinate))
    const central = layered.filter((coordinate) => isCentralHex(coordinate))

    for (const coordinate of [...surrounding, ...central]) {
      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const polygon = createPolygon(grid.getHexagonPoints(center, hexDiameter))
      polygon.setAttribute('fill', hexFill(coordinate))
      polygon.setAttribute('stroke', hexStroke(coordinate))
      polygon.setAttribute('stroke-width', isCentralHex(coordinate) ? '3' : '2')
      polygon.setAttribute('stroke-linejoin', 'round')
      board.append(polygon)
    }

    drawMovementArrows(board)
    drawForbiddenArrows(board)
    board.append(createNeighbourCircle(
      grid.getCenterPosition(centerCoordinate, hexDiameter)
    ))

    for (const coordinate of layered) {
      if (!isLabeledHex(coordinate)) {
        continue
      }

      const center = grid.getCenterPosition(coordinate, hexDiameter)
      const color = hexLabelColor(coordinate)

      if (isForbiddenCoordinate(coordinate)) {
        board.append(createNeighbourLabel(
          `${coordinate.x},${coordinate.y}`,
          coordinate,
          center,
          color
        ))
        continue
      }

      board.append(createLabel(
        `${coordinate.x},${coordinate.y}`,
        center,
        color
      ))
    }

    container.append(board)
  }

  function hexCoordinates() {
    const coordinates: Coordinate[] = []

    for (let x = 1; x <= 5; x += 1) {
      for (let y = 0; y <= 6; y += 1) {
        if ((x + y) % 2 === 0) {
          coordinates.push({ x, y })
        }
      }
    }

    return coordinates
  }

  function rectangleFill(x: number, y: number) {
    const id = keyOf({ x, y })

    if (id === '3,3') {
      return 'var(--fill-center)'
    }

    if (isForbiddenCoordinate({ x, y })) {
      return 'var(--fill-forbidden-cell)'
    }

    if (neighbourKeys.has(id)) {
      return 'var(--fill-neighbour)'
    }

    if ((x + y) % 2 === 0) {
      if (x === 0 || x === 6) {
        return 'var(--fill-edge)'
      }

      return 'var(--fill-valid)'
    }

    return 'var(--fill-mixed)'
  }

  function isCentralHex(coordinate: Coordinate) {
    return keyOf(coordinate) === '3,3' || neighbourKeys.has(keyOf(coordinate))
  }

  function hexStroke(coordinate: Coordinate) {
    if (isCentralHex(coordinate)) {
      return 'var(--stroke-overlay)'
    }

    return 'var(--stroke-boundary)'
  }

  function hexFill(coordinate: Coordinate) {
    const id = keyOf(coordinate)

    if (id === '3,3') {
      return 'var(--fill-center)'
    }

    if (isForbiddenCoordinate(coordinate)) {
      return 'var(--fill-forbidden-cell)'
    }

    if (neighbourKeys.has(id)) {
      return 'var(--fill-neighbour)'
    }

    return 'var(--fill-valid)'
  }

  function hexLabelColor(coordinate: Coordinate) {
    if (coordinate.y === 3 && (coordinate.x === 1 || coordinate.x === 5)) {
      return 'var(--label-marked)'
    }

    if (coordinate.x === 1 || coordinate.x === 5) {
      return 'var(--label-hex-axis)'
    }

    if (coordinate.y === 2 || coordinate.y === 4) {
      return 'var(--label-hex-diagonal)'
    }

    return 'var(--label-hex-row)'
  }

  function isLabeledHex(coordinate: Coordinate) {
    if (coordinate.y === 3 && coordinate.x % 2 === 1) {
      return coordinate.x >= 1 && coordinate.x <= 5
    }

    if (neighbourKeys.has(keyOf(coordinate))) {
      return true
    }

    return false
  }

  function createNeighbourCircle(center: Point, radius = neighbourCircleRadius) {
    const circle = createSvgElement('circle')
    circle.setAttribute('cx', String(center.x))
    circle.setAttribute('cy', String(center.y))
    circle.setAttribute('r', String(radius))
    circle.setAttribute('fill', 'var(--fill-center-mark)')
    circle.setAttribute('stroke', 'var(--stroke-neighbour-mark)')
    circle.setAttribute('stroke-width', '2')
    return circle
  }

  function createNeighbourLabel(
    text: string,
    coordinate: Coordinate,
    center: Point,
    color: string
  ) {
    const group = createSvgElement('g')
    const coordinateLabel = createLabel(
      text,
      { x: center.x, y: center.y - 11 },
      color
    )
    coordinateLabel.setAttribute('font-size', '20')
    const offsetLabel = createLabel(
      formatOffset(coordinate),
      { x: center.x, y: center.y + 11 },
      color
    )
    offsetLabel.setAttribute('font-size', '14')
    group.append(coordinateLabel, offsetLabel)

    if (isForbiddenCoordinate(coordinate)) {
      group.append(createForbiddenOffsetMark({ x: center.x, y: center.y + 11 }))
    }

    return group
  }

  function isForbiddenCoordinate(coordinate: Coordinate) {
    return forbiddenMoves.some((move) => keyOf(move) === keyOf(coordinate))
  }

  function createForbiddenOffsetMark(center: Point) {
    const mark = createSvgElement('g')
    mark.setAttribute('class', 'offset-mark')
    const scale = 14 / 24
    const strokes: ReadonlyArray<readonly [number, number, number, number]> = [
      [-17, -22, 12, 7],
      [9, -22, -17, 7]
    ]

    for (const [x1, y1, x2, y2] of strokes) {
      const line = createSvgElement('line')
      line.setAttribute('x1', String(center.x + x1 * scale))
      line.setAttribute('y1', String(center.y + y1 * scale))
      line.setAttribute('x2', String(center.x + x2 * scale))
      line.setAttribute('y2', String(center.y + y2 * scale))
      line.setAttribute('stroke', 'var(--stroke-offset-mark)')
      line.setAttribute('stroke-width', String(2.6 * scale))
      line.setAttribute('stroke-linecap', 'round')
      mark.append(line)
    }

    return mark
  }

  function formatOffset(coordinate: Coordinate) {
    const dx = coordinate.x - centerCoordinate.x
    const dy = coordinate.y - centerCoordinate.y
    return `(${signed(dx)},${signed(dy)})`
  }

  function signed(value: number) {
    return value > 0 ? `+${value}` : String(value)
  }

  function drawMovementArrows(layer: SVGElement) {
    const origin = grid.getCenterPosition(centerCoordinate, hexDiameter)

    for (const neighbour of grid.getNeighbours(centerCoordinate)) {
      const target = grid.getCenterPosition(neighbour, hexDiameter)
      layer.append(createMovementArrow(origin, target))
    }
  }

  function drawForbiddenArrows(layer: SVGElement) {
    const origin = grid.getCenterPosition(centerCoordinate, hexDiameter)
    const tip = forbiddenArrowTip(origin)
    const points = movementArrowTo(tip)

    for (const coordinate of forbiddenMoves) {
      const target = grid.getCenterPosition(coordinate, hexDiameter)
      layer.append(createMovementArrow(origin, target, 'var(--fill-forbidden)', points))
    }

    for (const coordinate of forbiddenMoves) {
      const target = grid.getCenterPosition(coordinate, hexDiameter)
      layer.append(createForbiddenCross(origin, target, tip))
    }
  }

  function forbiddenArrowTip(origin: Point) {
    const neighbour = grid.getNeighbours(centerCoordinate)[0]
    const blocked = forbiddenMoves[0]

    if (neighbour === undefined || blocked === undefined) {
      return arrowTip
    }

    const neighbourDistance = distance(
      origin,
      grid.getCenterPosition(neighbour, hexDiameter)
    )
    const blockedDistance = distance(
      origin,
      grid.getCenterPosition(blocked, hexDiameter)
    )
    return blockedDistance - (neighbourDistance - arrowTip)
  }

  function movementArrowTo(tip: number) {
    const headBase = tip - arrowHeadLength
    return [
      { x: arrowTail, y: -4 },
      { x: headBase, y: -4 },
      { x: headBase, y: -12.8 },
      { x: tip, y: 0 },
      { x: headBase, y: 12.8 },
      { x: headBase, y: 4 },
      { x: arrowTail, y: 4 }
    ]
  }

  function createMovementArrow(
    origin: Point,
    target: Point,
    fill = 'var(--fill-movement)',
    points = movementArrow
  ) {
    const arrow = createSvgElement('g')
    arrow.setAttribute('class', 'movement-arrow')
    arrow.setAttribute('transform', movementTransform(origin, target))
    const polygon = createPolygon(points)
    polygon.setAttribute('fill', fill)
    arrow.append(polygon)
    return arrow
  }

  function createForbiddenCross(origin: Point, target: Point, tip: number) {
    const cross = createSvgElement('g')
    cross.setAttribute('class', 'forbidden-cross')
    cross.setAttribute('transform', movementTransform(origin, target))
    const center = (arrowTail + tip) / 2
    const arm = 18
    cross.append(
      createForbiddenLine(center - arm, -arm, center + arm, arm),
      createForbiddenLine(center + arm, -arm, center - arm, arm)
    )
    return cross
  }

  function createForbiddenLine(x1: number, y1: number, x2: number, y2: number) {
    const line = createSvgElement('line')
    line.setAttribute('x1', String(x1))
    line.setAttribute('y1', String(y1))
    line.setAttribute('x2', String(x2))
    line.setAttribute('y2', String(y2))
    line.setAttribute('stroke', 'var(--stroke-forbidden)')
    line.setAttribute('stroke-width', '5')
    line.setAttribute('stroke-linecap', 'round')
    return line
  }

  function distance(from: Point, to: Point) {
    return Math.hypot(to.x - from.x, to.y - from.y)
  }

  function movementTransform(origin: Point, target: Point) {
    const degrees = Math.atan2(target.y - origin.y, target.x - origin.x) * 180 / Math.PI
    return `translate(${origin.x} ${origin.y}) rotate(${degrees})`
  }

  function createLabel(text: string, center: Point, color: string) {
    const label = createSvgElement('text')
    label.setAttribute('class', 'cell-label')
    label.setAttribute('font-size', '17')
    label.setAttribute('x', String(center.x))
    label.setAttribute('y', String(center.y))
    label.setAttribute('fill', color)
    label.setAttribute('text-anchor', 'middle')
    label.setAttribute('dominant-baseline', 'central')
    label.textContent = text
    return label
  }

  function createPolygon(points: Point[]) {
    const polygon = createSvgElement('polygon')
    polygon.setAttribute(
      'points',
      points.map((point) => `${point.x},${point.y}`).join(' ')
    )
    return polygon
  }

  function cellCenter(x: number, y: number): Point {
    return {
      x: (x + 0.5) * cellWidth,
      y: (y + 0.5) * cellHeight
    }
  }

  function createSvg(width: number, height: number) {
    const svg = createSvgElement('svg')
    svg.setAttribute('width', String(width))
    svg.setAttribute('height', String(height))
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    return svg
  }

  function createSvgElement<Name extends keyof SVGElementTagNameMap>(name: Name) {
    return document.createElementNS(svgNs, name)
  }

  function keyOf(coordinate: Coordinate) {
    return `${coordinate.x},${coordinate.y}`
  }

  function alignHexGrid() {
    const diagrams = root.querySelector('.diagrams')
    const leftSvg = ydom.querySelector('.grid')
    const rightSvg = hexgrid.querySelector('.hexes')

    if (
      !(diagrams instanceof HTMLElement) ||
      !(leftSvg instanceof SVGSVGElement) ||
      !(rightSvg instanceof SVGSVGElement)
    ) {
      return
    }

    const sideBySide = getComputedStyle(diagrams).flexDirection !== 'column'
    const leftWidth = leftSvg.width.baseVal.value
    const leftHeight = leftSvg.height.baseVal.value
    const rightWidth = rightSvg.width.baseVal.value
    const rightHeight = rightSvg.height.baseVal.value
    const scale = sharedDemonstrationScale()

    leftSvg.style.width = `${leftWidth * scale}px`
    leftSvg.style.height = `${leftHeight * scale}px`
    rightSvg.style.width = `${rightWidth * scale}px`
    rightSvg.style.height = `${rightHeight * scale}px`

    ydom.style.marginTop = '0'
    hexgrid.style.marginTop = '0'

    if (!sideBySide) {
      return
    }

    const leftCenter = cellCenter(centerCoordinate.x, centerCoordinate.y)
    const rightCenter = grid.getCenterPosition(centerCoordinate, hexDiameter)
    const leftPoint = toScreen(leftSvg, leftCenter)
    const rightPoint = toScreen(rightSvg, rightCenter)

    if (leftPoint === null || rightPoint === null) {
      return
    }

    // Flat-top hexes rise above the rectangle when the centers are level.
    // Drop both diagrams by that overhang so each stays below its heading rule.
    const centerOffset = leftPoint.y - rightPoint.y
    const shift = sharedTopShift(leftSvg, rightSvg, centerOffset)

    ydom.style.marginTop = `${shift}px`
    hexgrid.style.marginTop = `${centerOffset + shift}px`
  }

  function sharedTopShift(
    leftSvg: SVGSVGElement,
    rightSvg: SVGSVGElement,
    centerOffset: number
  ) {
    const leftHeading = ydom.closest('.diagram')?.querySelector('h2')
    const rightHeading = hexgrid.closest('.diagram')?.querySelector('h2')
    const rightTop = hexagonOutlineTop(rightSvg)

    if (
      !(leftHeading instanceof HTMLElement) ||
      !(rightHeading instanceof HTMLElement) ||
      rightTop === null
    ) {
      return 0
    }

    const leftGap = leftSvg.getBoundingClientRect().top - leftHeading.getBoundingClientRect().bottom
    const rightGap = rightTop + centerOffset - rightHeading.getBoundingClientRect().bottom

    return Math.max(0, leftGap - rightGap)
  }

  function hexagonOutlineTop(svg: SVGSVGElement) {
    const matrix = svg.getScreenCTM()

    if (matrix === null) {
      return null
    }

    let top = Infinity

    for (const polygon of svg.querySelectorAll(':scope > polygon')) {
      const points = polygon.getAttribute('points')

      if (points === null) {
        continue
      }

      const stroke = Number(polygon.getAttribute('stroke-width')) || 0
      const outset = (stroke / 2) * matrix.d

      for (const pair of points.trim().split(/\s+/)) {
        const [x, y] = pair.split(',')
        const point = svg.createSVGPoint()
        point.x = Number(x)
        point.y = Number(y)
        top = Math.min(top, point.matrixTransform(matrix).y - outset)
      }
    }

    return Number.isFinite(top) ? top : null
  }

  function toScreen(svg: SVGSVGElement, point: Point) {
    const matrix = svg.getScreenCTM()

    if (matrix === null) {
      return null
    }

    const svgPoint = svg.createSVGPoint()
    svgPoint.x = point.x
    svgPoint.y = point.y
    return svgPoint.matrixTransform(matrix)
  }
}
