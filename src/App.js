import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import './App.css';

function App() {
  const Rank2 = [
    {item: "Berserker Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Broken Box Pieces", reboot: 0.2729046, rebootNoMana: 0.2957331},
    {item: "Clean Defense Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Cleansing Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Clean Stance Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Crisis HM Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Crisis H Ring", reboot: 0.0191033, rebootNoMana: 0},
    {item: "Crisis M Ring", reboot: 0.0191033, rebootNoMana: 0},
    {item: "Critical Damage Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Critical Defense Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Critical Shift Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Durability Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Double Experience Coupons", reboot: 0.1091619, rebootNoMana: 0.1182932},
    {item: "Health Cut Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Level Jump Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Limit Ring", reboot: 0.0194931, rebootNoMana: 0},
    {item: "Mana Cut Ring", reboot: 0.0191033, rebootNoMana: 0},
    {item: "Ocean Glow Earrings", reboot: 0.0038986, rebootNoMana: 0.0042248},
    {item: "Overdrive Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Oz Point Pouches", reboot: 0.1091619, rebootNoMana: 0.1182932},
    {item: "Reflective Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Ring of Restraint", reboot: 0.0389864, rebootNoMana: 0.0422476},
    {item: "Risk Taker Ring", reboot: 0.020273, rebootNoMana: 0.0219688},
    {item: "Stance Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Swift Ring", reboot: 0.0191033, rebootNoMana: 0.0207013},
    {item: "Totalling Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Tower Boost Ring", reboot: 0.0194931, rebootNoMana: 0.0211238},
    {item: "Ultimatum Ring", reboot: 0.020273, rebootNoMana: 0.0219688},
    {item: "Weapon Jump", reboot: 0.020273, rebootNoMana: 0.0219688},
];

function GenerateRing() {
    let totalChance = 0
    for (let i = 0; i < Rank2.length; i++) {
      totalChance += Rank2[i].reboot;
    }
      let RNG = Math.random() * totalChance
      let currentTotal = 0
      let prize = Rank2[0].item

      for (let i = 0; i < Rank2.length; i++) {
        currentTotal += Rank2[i].reboot
        if (RNG < currentTotal) {
          prize = Rank2[i].item
          break
        }
      }
      return prize
    }
  GenerateRing()
  function GenerateLevel() {
    const RingLevel = [
      {level: "1", chance: .41}, 
      {level: "2", chance: .28}, 
      {level: "3", chance: .20}, 
      {level: "4", chance: .11}
    ]

    let totalChance = 0
    for (let i = 0; i < RingLevel.length; i++) {
      totalChance += RingLevel[i].chance;
    }
    let RNG = Math.random() * totalChance
    let currentTotal = 0
    let level = RingLevel[0].level
    for (let i = 0; i < RingLevel.length; i++) {
      currentTotal += RingLevel[i].chance
      if (RNG < currentTotal) {
        level = RingLevel[i].level
        break
      }
    }
    return level
  }
  
  // function OpenBox() {

  // }
  const [rank, setRank] = useState("2");
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(null);
  const [disabled, setDisabled] = useState(false)
  const [item, setItem] = useState("Rank2")
  const [rolled, setRolled] = useState(null)
  
  let progress = 0
  function Progress() {
    //4s
    setTimeout(() => {
      if (progress < 100) {
        progress ++
        setLoading(progress)
        Progress()
      } else {
        setDisabled(false)
      }
    }, 30)
  }
  
  const handleOpen = () => {
    setLoading(null)
    setText(null)
    setDisabled(true)
    setTimeout(() => {
      Progress()
    }, 450)
    const reward = GenerateRing()
    let level = ""
    if (reward === 'Broken Box Pieces' || reward === 'Oz Point Pouches' || reward === 'Ocean Glow Earrings' || reward === 'Double Experience Coupons') {

    } else {
      level = ` (${GenerateLevel()})`
    }
    setTimeout(() => {
      setItem(reward.replace(/ /g, ''))
      setText(reward + level)
      setRolled(true)
    }, 4000)
  }

  const handleReset = () => {
    setItem("Rank2")
    setRank("2")
    setText(null)
    setLoading(null)
    setRolled(null)
  }

  return (
    <div className="App">
      <h1>Oz Ring Simulator</h1>
      <form>
        <div className="server">
          <h2>What server do you play on?</h2>
              <input type="radio" id="reboot" name="server" value="Reboot" defaultChecked/>
              <label htmlFor="reboot">Reboot</label>
              <input type="radio" id="regular" name="server" value="Regular" disabled/>
              <label htmlFor="regular">Regular</label>
          </div>
        <div className="manaRadios">
          <h2>Does your class use mana?</h2>
              <input type="radio" id="mana-yes" name="mana_or_none" value="Yes" defaultChecked/>
              <label htmlFor="mana-yes">Yes</label>
              <input type="radio" id="mana-no" name="mana_or_none" value="No"/>
              <label htmlFor="mana-no">No</label>
        </div>
        <div className="rankBox">
          <h2>What box do you want to open?</h2>
              <input type="radio" id="box-1" name="boxRank" value="1" defaultChecked/>
              <label htmlFor="box-1">Rank 1</label>
              <input type="radio" id="box-2" name="boxRank" value="2"/>
              <label htmlFor="box-2">Rank 2</label>
        </div>
      </form>
      <div className="box-ui">
          <div className="box-title">
            ALICIA'S BOX
          </div>
        <div className="box">
          <div className="opening">
            {text ? text : `OPENING A RANK ${rank} BOX`}
          </div>
          <div className="progress-bar">
            <ProgressBar variant="danger" now={loading} />
          </div>
          <div className="item">
            <img src={`/items/${item}.png`} alt="ring"></img>
          </div>
          <div className="box-buttons">
            {
              rolled ? <button className="ok" onClick={handleReset}>OK</button> : <>
            <button className={ disabled ? "open disabled" : "open" } onClick={handleOpen} disabled={disabled}>OPEN</button>
            <button className="cancel" onClick={handleReset}>CANCEL</button>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
