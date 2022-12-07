const stream = (await Deno.readTextFile("../_input/6.txt")).split("");

const processStream = (len) => (char, i) => {
  const chunk = new Set(stream.slice(i, i + len))
  if (chunk.size === len) return i + len
}

const part1 = stream.map(processStream(4)).filter(Boolean)[0]
const part2 = stream.map(processStream(14)).filter(Boolean)[0]

console.log("Part 1: ", part1)
console.log("Part 2: ", part2)
