const monkeys = (await Deno.readTextFile("../_input/11.txt"))
  .split("\n\n")
  .map((m) => m.split("\n"))
  .map(monkey => {
    return {
      items: monkey[1].split(":")[1].split(",").map(item => item.trim()).map(Number),
      operation: monkey[2].split(":")[1].trim().split(" = ")[1],
      test: {
        divisible: Number(monkey[3].split(":")[1].trim().split("divisible by")[1]),
        ifTrue: Number(monkey[4].split(" ").reverse()[0]),
        ifFalse: Number(monkey[5].split(" ").reverse()[0])
      }
    }
  })

const totalInspects = new Array(monkeys.length).fill(0)

const numRounds = 20

for (let i = 0; i < numRounds; i++) {
  monkeys.forEach(monkey => {
    while (monkey.items.length > 0) {
      const item = monkey.items.shift()
      if (item) {
        totalInspects[monkeys.indexOf(monkey)]++
        const worryLevel = Math.floor(eval(monkey.operation.replaceAll("old" , item)) / 3)
        if (worryLevel % monkey.test.divisible === 0) {
          monkeys[monkey.test.ifTrue].items.push(worryLevel)
        } else {
          monkeys[monkey.test.ifFalse].items.push(worryLevel)
        }
      }
    }
  });
}

const monkeyBusinessLevel = totalInspects
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b)

console.log("Part 1:", monkeyBusinessLevel)