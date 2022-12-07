const text = await Deno.readTextFile("../_input/2.txt");

// Rock defeats Scissors, 
// Scissors defeats Paper 
// Paper defeats Rock.

const shapeScore = {
  X: 1, // rock     A
  Y: 2, // paper    B
  Z: 3, // scissors C
}

const outcomeScores = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
}

const sum = (a, b) => a + b

const rounds = text.split("\n").map(round => round.split(" "))

console.log("Part 1: ", 
  rounds
    .map(([a, b]) => outcomeScores[a][b] + shapeScore[b])
    .reduce(sum, 0)
)

const strategy = {
  X: 0,
  Y: 3,
  Z: 6
}

console.log("Part 2: ", 
  rounds
    .map(([a, b]) => {
      const newB = Object
        .entries(outcomeScores[a])
        .filter(([key, value]) => value === strategy[b])
        .flat()[0] as string
      return outcomeScores[a][newB] + shapeScore[newB]
    })
    .reduce(sum, 0)
)
