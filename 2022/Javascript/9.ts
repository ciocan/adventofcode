const _data = (await Deno.readTextFile("../_input/9.txt")).split("\n");

const data = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split("\n");

data.forEach((line) => {
  const [direction, distance] = line.split(" ");
  console.log(direction, distance);
});

// console.log("Part 1: ", p1)
// console.log("Part 2: ", p2)

