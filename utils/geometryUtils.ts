type RawLine = {
    start_x: string
    start_y: string
    end_x: string
    end_y: string
}

type Line = {
    startX: number
    startY: number
    endX: number
    endY: number
}

export type Point = number[]

export const rawToLine = (rawLine: RawLine): Line => ({
    startX: parseFloat(rawLine.start_x.replace(',', '.')),
    startY: parseFloat(rawLine.start_y.replace(',', '.')),
    endX: parseFloat(rawLine.end_x.replace(',', '.')),
    endY: parseFloat(rawLine.end_y.replace(',', '.'))
})


const SPEED_PER_TICK = 0.0001
const LERP = (start: number, end: number, progress: number) => start + (end - start) * progress

export const lineToPoints = (line: Line): Point[] => {
    const points = new Set<Point>()
    const deltaX = line.endX - line.startX
    const deltaY = line.endY - line.startY

    const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))

    var currentPosition = 0
    while (currentPosition < distance) {
        const progress = currentPosition / distance
        points.add([LERP(line.startX, line.endX, progress), LERP(line.startY, line.endY, progress)])
        currentPosition += SPEED_PER_TICK
    }

    points.add([line.endX, line.endY])
    return Array.from(points)
}