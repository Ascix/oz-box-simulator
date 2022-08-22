export const normal = [
  { level: "1", chance: 0.41 },
  { level: "2", chance: 0.28 },
  { level: "3", chance: 0.2 },
  { level: "4", chance: 0.11 },
]

export const special = [
  { level: "3", chance: 0.75 },
  { level: "4", chance: 0.25 },
]

export function GenerateLevel(shiny) {

    let totalChance = 0;
    for (let i = 0; i < (!shiny ? normal.length : special.length); i++) {
      totalChance += (!shiny ? normal[i].chance : special[i].chance)
    }
    let RNG = Math.random() * totalChance;
    let currentTotal = 0;
    let level = normal[0].level;
    for (let i = 0; i < (!shiny ? normal.length : special.length); i++) {
      currentTotal += (!shiny ? normal[i].chance : special[i].chance)
      if (RNG < currentTotal) {
        level = (!shiny ? normal[i].level : special[i].level)
        break;
      }
    }
    return level;
  }