const cubes = (await Deno.readTextFile("../_input/18.txt"))
  .split("\n")
  .map((line) => line.split(",").map(Number));

console.log("Part 1:", surfaceArea(cubes));

function surfaceArea(coords) {
  const GRID_SIZE = 100
  const grid = new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(0)));

  for (const [x, y, z] of coords) {
    grid[x][y][z] = 1;
  }
  let surfaceArea = 0;

  for (const [x, y, z] of cubes) {
    if (!grid[x - 1]?.[y]?.[z]) surfaceArea++;
    if (!grid[x + 1]?.[y]?.[z]) surfaceArea++;
    if (!grid[x]?.[y - 1]?.[z]) surfaceArea++;
    if (!grid[x]?.[y + 1]?.[z]) surfaceArea++;
    if (!grid[x]?.[y]?.[z - 1]) surfaceArea++;
    if (!grid[x]?.[y]?.[z + 1]) surfaceArea++;
  }

  return surfaceArea;
}

