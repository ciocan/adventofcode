const moves = (await Deno.readTextFile("../_input/9_test.txt"))
  .split("\n")
  .map((line) => line.split(" "))
  .map(([direction, distance]) => [direction, Number(distance)]);

const DIRECTIONS = {
  U: [-1, 0],
  D: [+1, 0],
  R: [0, +1],
  L: [0, -1],
}

let head = [0, 0]
let tail = head
const posToStr = ([r, c]: number[]) => `${r}:${c}`
const visited = new Set([posToStr(head)])

const moveHead = (direction) => {
  console.log(head)
  head = [
    head[0] + DIRECTIONS[direction][0],
    head[1] + DIRECTIONS[direction][1]
  ];
}

const isBehind = (pos = tail) => pos.some((n, i) => Math.abs(n - head[i]) > 1);
const isDiagonal = () => tail.every((n, i) => n !== head[i])

const moveTail = () => {
  if (!isBehind()) return
  if (isDiagonal()) {
    let move = [-1, -1]
    if (!isBehind([tail[0] + 1, tail[1] + 1])) move = [1, 1]
    else if (!isBehind([tail[0] + 1, tail[1] - 1])) move = [1, -1]
    else if (!isBehind([tail[0] - 1, tail[1] + 1])) move = [-1, 1]
    tail[0] += move[0]
    tail[1] += move[1]
  } else {
    if (!isBehind([tail[0] + 1, tail[1]])) tail[0] += 1
    else if (!isBehind([tail[0] - 1, tail[1]])) tail[0] -= 1
    else if (!isBehind([tail[0], tail[1] + 1])) tail[1] += 1
    else tail[1] -= 1
  }
}

moves.forEach(([direction, distance]) => {
  for (let i = 1; i <= distance; i++) {
    moveHead(direction)
    moveTail()
    visited.add(posToStr(tail))
  }
});

console.log(visited)
console.log("Part 1:", visited.size)
