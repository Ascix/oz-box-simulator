import { allRanks } from "./AllRanks";

function generatePrize(rank, mana, _server) {
    let totalChance = 0;

    const items = allRanks[rank].items

    for (let i = 0; i < items.length; i++) {
      totalChance += items[i].reboot;
    }
    let RNG = Math.random() * totalChance;
    let currentTotal = 0;
    let prize = items[0].item;
    for (let i = 0; i < items.length; i++) {
      currentTotal += mana ? items[i].reboot : items[i].noMana
      if (RNG < currentTotal) {
        prize = items[i].item;
        break;
      }
    }
    return prize
}

export default generatePrize