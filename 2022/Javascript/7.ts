const commands = (await Deno.readTextFile("../_input/7.txt")).split("\n");

const sizes: { [p: string]: number } = {}
const currentPath: string[] = []

commands.forEach((command) => {
  const [, commandType] = command.split("$ ");
  if (commandType?.startsWith("cd ")) {
    const dir = commandType.split(" ")[1];
    if (dir === "..") {
      currentPath.pop();
    } else {
      currentPath.push(dir);
      sizes[currentPath.join("/")] = 0;
    }
  } else if (commandType?.startsWith("ls")) {
    return
  } else {
    const [size, name] = command.split(" ");
    if (size === "dir") return;
    const tempPath: string[] = []
    currentPath.forEach(p => {
      tempPath.push(p)
      sizes[tempPath.join("/")] += Number(size)
    })
  }
})

const result1 = Object.values(sizes)
  .filter(s => s <= 100_000)
  .reduce((a, b) => a + b, 0)

const totalSpace = 70_000_000
const minUnusedSpace = 30_000_000
const freeSpace = totalSpace - sizes["/"]

const result2 = Object.values(sizes)
  .filter(s => freeSpace + s >= minUnusedSpace)
  .sort((a, b) => a - b)

console.log("Part 1: ", result1)
console.log("Part 2: ", result2[0])
