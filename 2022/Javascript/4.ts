const assignments = (await Deno.readTextFile("../_input/4.txt")).split("\n");

const sum = (a, b) => a + b

const processPart1 = (section: string): number => {
  const [pair1, pair2] = section.split(",")
  const [r11, r12] = pair1.split("-").map(Number)
  const [r21, r22] = pair2.split("-").map(Number)
  
  if ((r11 >= r21 && r12 <= r22) || (r11 <= r21 && r12 >= r22)) {
    return 1
  }

  return 0
}

const total1 = assignments
  .map(processPart1)
  .reduce(sum, 0)

console.log("Part 1: ", total1)

const processPart2 = (section: string): number => {
  const arr = section.split(",")
    .map(pair => pair.split("-").map(Number))
    .map(([r1, r2]) => [...Array(r2 + 1).keys()].slice(r1))
    .reduce((acc, val) => acc.concat(val), [])

  const d = arr.filter((v, i) => arr.indexOf(v) !== i)

  if (d.length >= 1) return 1
  return 0
}

const total2 = assignments
  .map(processPart2)
  .reduce(sum, 0)

console.log("Part 2: ", total2)
