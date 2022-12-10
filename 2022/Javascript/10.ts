const instructions = (await Deno.readTextFile("../_input/10_sample.txt"))
  .split("\n")
  .map((line) => line.split(" "));

let registerX = 1
let cycle = 1
let buffer = [0] as number[]
let strength = 0
let cycles = [20, 60, 100, 140, 180, 220]

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

  cycle++
}

console.log("Part 1:", strength)