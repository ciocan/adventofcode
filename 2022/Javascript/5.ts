const moves = (await Deno.readTextFile("../_input/5.txt")).split("\n");

const default_stacks = {
  1: "HCR",
  2: "BJHLSF",
  3: "RMDHJTQ",
  4: "SGRHZBJ",
  5: "RPFZTDCB",
  6: "THCG",
  7: "SNVZBPWL",
  8: "RJQGC",
  9: "LDTRHPFS",
}

const crateMover9000 = (from: number, to: number) => {
  const stackFrom = stacks[from];
  const topCrate = stackFrom.slice(-1);
  stacks[from] = stackFrom.slice(0, -1);
  stacks[to] = stacks[to] + topCrate;
}

const crateMover9001 = (from: number, to: number, n: number) => {
  const stackFrom = stacks[from];
  const crates = stackFrom.slice(-n);
  stacks[from] = stackFrom.slice(0, -n);
  stacks[to] = stacks[to] + crates;
}

const processStacks = (type = 1) => (move) => {
  const [moves, from, to] = move
    .match(/move (\d+) from (\d+) to (\d+)/)
    .slice(1)
    .map(Number)
    
  if (type === 1) {
    for (let i = 1; i <= moves; i++) {
      crateMover9000(from, to);
    }
  } else {
    crateMover9001(from, to, moves);
  }
}

const getTopCrates = (stacks: { [i: number]: string }) => 
  Object.values(stacks).map(stack => stack.slice(-1)).join("");

let stacks = { ...default_stacks };
moves.forEach(processStacks(1))
console.log("Part 1: ", getTopCrates(stacks));
stacks = { ...default_stacks };
moves.forEach(processStacks(2))
console.log("Part 2: ", getTopCrates(stacks));