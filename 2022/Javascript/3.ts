const text = await Deno.readTextFile("../_input/3.txt");

const getPriority = (char: string): number => {
  if (char === char.toUpperCase()) return char.charCodeAt(0) - 38
  return char.charCodeAt(0) - 96
}

const processRucksack = (r) => {
  const half = r.length / 2
  const firstCompartment = r.slice(0, half)
  const secondCompartment = r.slice(half)
  const common = firstCompartment.split("").filter((c) => secondCompartment.includes(c))
  return getPriority(common[0])
}

const add = (a, b) => a + b

const total1 = text
  .split("\n")
  .map(processRucksack)
  .reduce(add, 0)

console.log("Part 1: ", total1)

const processBadges = (group) => {
  const rucksacks = group.split("\n")
  const badge = rucksacks[0]
    .split("")
    .filter((c) => rucksacks[1].includes(c))
    .filter((c) => rucksacks[2].includes(c))
  return getPriority(badge[0])
}

const total2 = text
  .match(/(?:^.*$\n?){1,3}/mg)
  ?.map(processBadges)
  .reduce(add, 0)

console.log("Part 2: ", total2)
