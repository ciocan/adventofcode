const trees = (await Deno.readTextFile("../_input/8.txt"))
  .split("\n").map(row => row.split("").map(t => Number(t)));

const size = trees.length
const treesOnTheEdge = 4 * size - 4
let totalVisible = treesOnTheEdge
let scenicScore = 0

const isVisibleHorizontal = (tree, x, start, end) => {
  for (let i = start; i < end; i++) {
    if (trees[x][i] >= tree) return false
  }
  return true
}

const isVisbleVertical = (tree, y, start, end) => {
  for (let i = start; i < end; i++) {
    if (trees[i][y] >= tree) return false
  }
  return true
}

const getScenicScore = (x, y) => {
  const score = [0, 0, 0, 0]
  for (let i = x - 1; i >= 0; i--) { // up
    if (trees[i][y] >= trees[x][y]) {
      score[0]++
      break
    } else {
      score[0]++
    }
  }
  for (let i = y - 1; i >= 0; i--) { // left
    if (trees[x][i] >= trees[x][y]) {
      score[1]++
      break
    } else {
      score[1]++
    }
  }
  for (let i = y + 1; i < size; i++) { // right
    if (trees[x][i] >= trees[x][y]) {
      score[2]++
      break
    } else {
      score[2]++
    }
  }
  for (let i = x + 1; i < size; i++) { // down
    if (trees[i][y] >= trees[x][y]) {
      score[3]++
      break
    } else {
      score[3]++
    }
  }
  return score.filter(Boolean).reduce((a, b) => a * b, 1)
}

for (let x = 1; x < size - 1; x++) {
  for (let y = 1; y < size - 1; y++) {
    if (isVisibleHorizontal(trees[x][y], x, 0, y) || 
        isVisibleHorizontal(trees[x][y], x, y + 1, size) || 
        isVisbleVertical(trees[x][y], y, 0, x) || 
        isVisbleVertical(trees[x][y], y, x + 1, size)
    ) {
      totalVisible++
    }
  }
}

for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    const score = getScenicScore(x, y)
    if (score > scenicScore) {
      scenicScore = score
    }
  }
}

console.log("Part 1: ", totalVisible)
console.log("Part 2: ", scenicScore)

