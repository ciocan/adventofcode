const grid = (await Deno.readTextFile("../_input/12.txt"))
  .split("\n")
  .map(row => row.split(""))

type Pos = number[]
type Len = number
type Dir = Record<string, Pos>
type Queue = [Pos, Len][]

const directions: Dir = {
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
  "<": [-1, 0],
}

const getPos = (item: string) => grid.map((r, i) => r.map((c, j) => c === item ? [i, j] : null).filter(Boolean).flat()).filter(Boolean).flat() as [number, number]

const start = getPos("S")
const end = getPos("E")
const [nr, nc] = [grid.length, grid[0].length]
grid[start[0]][start[1]] = "a"
grid[end[0]][end[1]] = "z"

const posToStr = ([r, c]: Pos) => `${r}:${c}`
const isPosInGrid = ([r, c]: Pos) => r >= 0 && r < nr && c >= 0 && c < nc
const isAtMostOneHigher = cur => ([r, c]: Pos) => grid[r][c].charCodeAt(0) - cur.charCodeAt(0) <= 1

const bfs = (start: Pos) => {
  const queue: Queue = [[start, 0]]
  const visited = new Set([posToStr(start)])
  let length = Number.POSITIVE_INFINITY

  while (queue.length) {
    const [pos, steps] = queue.shift()!

    if (posToStr(pos) === posToStr(end)) {
      length = steps
      break
    }

    Object.values(directions)
      .map(([dRow, dCol]) => [pos[0] + dRow, pos[1] + dCol])
      .filter(isPosInGrid)
      .filter(isAtMostOneHigher(grid[pos[0]][pos[1]]))
      .filter((pos) => !visited.has(posToStr(pos)))
      .forEach((pos) => {
        visited.add(posToStr(pos))
        queue.push([pos, steps + 1])
      })
  }

  return length
}

console.log("Part 1:", bfs(start))

const starts = grid.map((line, l) => line.map((col, c) => col === "a" ? [l, c] : null).filter(Boolean)).flat()
console.log("Part 2:", Math.min(...starts.map(bfs)))



