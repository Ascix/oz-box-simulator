export function GenerateLevel() {
    const RingLevel = [
      { level: "1", chance: 0.41 },
      { level: "2", chance: 0.28 },
      { level: "3", chance: 0.2 },
      { level: "4", chance: 0.11 },
    ];

    let totalChance = 0;
    for (let i = 0; i < RingLevel.length; i++) {
      totalChance += RingLevel[i].chance;
    }
    let RNG = Math.random() * totalChance;
    let currentTotal = 0;
    let level = RingLevel[0].level;
    for (let i = 0; i < RingLevel.length; i++) {
      currentTotal += RingLevel[i].chance;
      if (RNG < currentTotal) {
        level = RingLevel[i].level;
        break;
      }
    }
    return level;
  }