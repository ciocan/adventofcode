const text = await Deno.readTextFile("../_input/1.txt");

const result = text.split("\n\n")
  .map(str => str.split("\n"))
  .map(arr => arr.reduce((a,b) => Number(a) + Number(b), 0))
  .sort((a,b) => b - a)
  .slice(0,3)

console.log("Part 1: ", result[0])
console.log("Part 2: ",result.reduce((a,b) => a + b, 0))
