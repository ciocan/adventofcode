const instructions = (await Deno.readTextFile("../_input/10.txt"))
  .split("\n")
  .map((line) => line.split(" "));

const NUM_ROWS = 6
const NUM_COLS = 40
const NUM_PIXELS = NUM_ROWS * NUM_COLS
let registerX = 1
let cycle = 1
let buffer = [0] as number[]
let strength = 0
let cycles = [20, 60, 100, 140, 180, 220]
let display = new Array(NUM_PIXELS).fill(".")
let pointer = 0

while (buffer.length) {
  const val = buffer.shift()!

  if (instructions.length) {
    const [op, arg] = instructions.shift()!
    const num = Number(arg)
  
    switch (op) {
      case "noop":
        buffer.push(0)
        break
      case "addx":
        buffer.push(0, num)
        break
    }
  }

  registerX += val

  if (cycles.includes(cycle)) {
    strength += (cycle * registerX)
  }

  if (
    (cycle - 1) % NUM_COLS === registerX - 1 || 
    (cycle - 1) % NUM_COLS === registerX - 0 || 
    (cycle - 1) % NUM_COLS === registerX + 1
  ) {
    display[cycle - 1] = "#"
  }

  cycle++
}

console.log("Part 1:", strength)

const showDisplay = () =>
  Array.from({ length: NUM_ROWS }, (v, i) =>
   display.slice(i * NUM_COLS, i * NUM_COLS + NUM_COLS).join("")
  );

console.log("Part 2:")
showDisplay().map((line) => console.log(line))