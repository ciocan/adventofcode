const monkeysText = (await Deno.readTextFile("../_input/11.txt"))

const parseMonkeysText = (text) => text.split("\n\n")
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

const getMonkeyBusinessLevel = (monkeys, numRounds, round = 1) => {
  const totalInspects = new Array(monkeys.length).fill(0)
  
  for (let i = 0; i < numRounds; i++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift()
        if (item) {
          totalInspects[monkeys.indexOf(monkey)]++

          let worryLevel = eval(monkey.operation.replaceAll("old" , item))

          worryLevel = round === 1 ? Math.floor(worryLevel / 3) : worryLevel %= divisor

          if (worryLevel % monkey.test.divisible === 0) {
            monkeys[monkey.test.ifTrue].items.push(worryLevel)
          } else {
            monkeys[monkey.test.ifFalse].items.push(worryLevel)
          }
        }
      }
    });
  }
  
  return totalInspects
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b)
}

let monkeys = parseMonkeysText(monkeysText)
const part1 = getMonkeyBusinessLevel(monkeys, 20, 1)
console.log("Part 1:", part1)
monkeys = parseMonkeysText(monkeysText)
const divisor = monkeys.reduce((acc, monkey) => acc * monkey.test.divisible, 1);
const part2 = getMonkeyBusinessLevel(monkeys, 10000, 2)
console.log("Part 2:", part2)