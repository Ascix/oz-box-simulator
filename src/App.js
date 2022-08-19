import { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import "./App.css";
import HistoryScroll from "./components/HistoryScroll";
import { Rank1 } from "./components/Rank1";
import { Rank2 } from "./components/Rank2";

function App() {
  const [rank, setRank] = useState("Rank1");
  const [mana, setMana] = useState("Yes");
  const [quickRoll, setQuickRoll] = useState(false)
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState("100");
  const [disabled, setDisabled] = useState(false);
  const [item, setItem] = useState("Rank1");
  const [rolled, setRolled] = useState(null);
  const [history, setHistory] = useState([]);

  function GeneratePrize() {
    let totalChance = 0;

    if (rank === "Rank1") {
      if (mana === "Yes") {
        for (let i = 0; i < Rank1.length; i++) {
          totalChance += Rank1[i].reboot;
        }
        let RNG = Math.random() * totalChance;
        let currentTotal = 0;
        let prize = Rank2[0].item;
        for (let i = 0; i < Rank1.length; i++) {
          currentTotal += Rank1[i].reboot;
          if (RNG < currentTotal) {
            prize = Rank1[i].item;
            break;
          }
        }
        return prize;
      } else {
        for (let i = 0; i < Rank1.length; i++) {
          totalChance += Rank1[i].noMana;
        }
        let RNG = Math.random() * totalChance;
        let currentTotal = 0;
        let prize = Rank2[0].item;
        for (let i = 0; i < Rank1.length; i++) {
          currentTotal += Rank1[i].noMana;
          if (RNG < currentTotal) {
            prize = Rank1[i].item;
            break;
          }
        }
        return prize;
      }
    }
    if (rank === "Rank2") {
      if (mana === "Yes") {
        for (let i = 0; i < Rank2.length; i++) {
          totalChance += Rank2[i].reboot;
        }
        let RNG = Math.random() * totalChance;
        let currentTotal = 0;
        let prize = Rank2[0].item;
        for (let i = 0; i < Rank2.length; i++) {
          currentTotal += Rank2[i].reboot;
          if (RNG < currentTotal) {
            prize = Rank2[i].item;
            break;
          }
        }
        return prize;
      } else {
        for (let i = 0; i < Rank2.length; i++) {
          totalChance += Rank2[i].noMana;
        }
        let RNG = Math.random() * totalChance;
        let currentTotal = 0;
        let prize = Rank2[0].item;
        for (let i = 0; i < Rank2.length; i++) {
          currentTotal += Rank2[i].noMana;
          if (RNG < currentTotal) {
            prize = Rank2[i].item;
            break;
          }
        }
        return prize;
      }
    }
  }
  

  function GenerateLevel() {
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


  let progress = 0;
  function Progress() {
    //4s
    setTimeout(() => {
      if (progress < 100) {
        progress++;
        setLoading(progress);
        Progress();
      } else {
        setDisabled(false);
      }
    }, 30);
  }

  const handleOpen = () => {
    const reward = GeneratePrize();
    let level = "";
    if (
      reward === "Broken Box Pieces" ||
      reward === "Oz Point Pouches" ||
      reward === "Ocean Glow Earrings" ||
      reward === "Double Experience Coupons"
    ) {
    } else {
      level = ` (${GenerateLevel()})`;
    }
    if (quickRoll) {
      setHistory([...history, reward + level]);
    } else {
      setLoading(null);
      setText(null);
      setDisabled(true);
      setTimeout(() => {
        Progress();
      }, 450);
      setTimeout(() => {
        setItem(reward?.replace(/ /g, ""));
        setText(reward + level);
        setHistory([...history, reward + level]);
        setRolled(true);
      }, 3900);
    }
  };

  useEffect(() => {
    HistoryScroll()
  }, [history]);

  const handleReset = () => {
    setItem(rank);
    setText(null);
    setRolled(null);
  };

  const handleRank = (e) => {
    setRank(e.target.value);
    setItem(e.target.value);
  };

  const handleMana = (e) => {
    setMana(e.target.value);
  };

  const handleQuickRoll = (e) => {
    setQuickRoll(!quickRoll);
  };

  return (
    <div className="App">
      <div className="title">Oz Box Simulator</div>
      <p>created by Audi#5187 on discord</p>
      <div className="ui">
        <div className="box-ui">
          <div className="box-title">ALICIA'S BOX</div>
          <div className="box">
            <div className="opening">
              {text ? text : `OPENING A RANK ${rank.charAt(4)} BOX`}
            </div>
            <div className="progress-bar">
              <ProgressBar variant="danger" now={loading} />
            </div>
            <div className="item">
              <img src={`/items/${item}.png`} alt="ring"></img>
            </div>
            <div className="box-buttons">
              {rolled ? (
                <button className="ok" onClick={handleReset}>
                  OK
                </button>
              ) : (
                <>
                  <button
                    className={disabled ? "open disabled" : "open"}
                    onClick={handleOpen}
                    disabled={disabled}
                  >
                    OPEN
                  </button>
                  <button className="cancel" onClick={handleReset}>
                    CANCEL
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="history">
          <div className="box-title">PULL HISTORY</div>
          <div className="box">
            <div className="pulls" id="pulls">
              {history.map((item, index) => {
                return <div key={index}>{index + 1}. {item}</div>;
              })}
            </div>
            <div className="total">
              Total Boxes Opened: {history.length}
            </div>
          </div>
        </div>
      </div>
      <Card className="d-flex mx-auto form" style={{ width: "50vw" }}>
        <form>
          <h2>Settings</h2>
          <div>
          <input className="form-check-input" onChange={handleQuickRoll} type="checkbox" value="" id="quickRoll" checked={quickRoll}/>
          <label className="form-check-label" htmlFor="quickRoll">
            Quick Roll
          </label>
          </div>
          <div className="server">
            <h4>Server</h4>
            <div className="radios">
              <input
                type="radio"
                id="reboot"
                name="server"
                value="Reboot"
                defaultChecked
                disabled={disabled}
              />
              <label htmlFor="reboot">Reboot</label>
              <input
                type="radio"
                id="regular"
                name="server"
                value="Regular"
                disabled={true}
              />
              <label htmlFor="regular">Regular</label>
            </div>
          </div>
          <div className="manaRadios" onChange={handleMana}>
            <h4>Mana class?</h4>
            <div className="radios">
              <input
                type="radio"
                id="yesMana"
                name="mana_or_none"
                value="Yes"
                defaultChecked
                disabled={disabled}
              />
              <label htmlFor="yesMana">Yes</label>
              <input
                type="radio"
                id="noMana"
                name="mana_or_none"
                value="No"
                disabled={disabled}
              />
              <label htmlFor="noMana">No</label>
            </div>
          </div>
          <div className="rankRadios" onChange={handleRank}>
            <h4>Box Rank</h4>
            <div className="radios">
              <input
                type="radio"
                id="box-1"
                name="boxRank"
                value="Rank1"
                defaultChecked
                disabled={disabled}
              />
              <label htmlFor="box-1">Rank 1</label>
              <input
                type="radio"
                id="box-2"
                name="boxRank"
                value="Rank2"
                disabled={disabled}
              />
              <label htmlFor="box-2">Rank 2</label>
            </div>
          </div>

        </form>
      </Card>
      <div className="info">
        <p>
          All information and probability rates were taken from the KMS website
          located{" "}
          <a href="https://maplestory.nexon.com/Guide/OtherProbability/ringBox/aliciaRingBox">
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default App;
