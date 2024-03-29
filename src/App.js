import { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import "./App.css";
import { allRanks } from "./components/AllRanks";
import { GenerateLevel, normal, special } from "./components/GenerateLevel";
import generatePrize from "./components/GeneratePrize";
import HistoryScroll from "./components/HistoryScroll";

function App() {
  const [rank, setRank] = useState("Rank1");
  const [mana, setMana] = useState(true);
  const [time, setTime] = useState(45);
  const [target, setTarget] = useState(null);
  const [targetItem, setTargetItem] = useState("none");
  const [targetLevel, setTargetLevel] = useState("none");
  const [shiny, setShiny] = useState(false);
  const [box, setBox] = useState("RANK 1");
  const [quickRoll, setQuickRoll] = useState(false);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState("100");
  const [disabled, setDisabled] = useState(false);
  const [item, setItem] = useState("Rank1");
  const [rolled, setRolled] = useState(null);
  const [average, setAverage] = useState(null);
  const [history, setHistory] = useState([]);

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

  // function Roulette() {
  //     setItem(rank?.[Math.floor(Math.random() * rank.length)].item.replace(/ /g, ""))
  // }

  const handleOpen = () => {
    const reward = generatePrize(rank, mana, undefined);
    let level = "";
    if (
      reward === "Broken Box Pieces" ||
      reward === "Oz Point Pouches" ||
      reward === "Ocean Glow Earrings" ||
      reward === "2x Experience Coupons"
    ) {
    } else {
      level = ` (${GenerateLevel(shiny)})`;
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
        // Roulette()
        setText(reward + level);
        setHistory([...history, reward + level]);
        setRolled(true);
        setItem(reward?.replace(/ /g, ""));
      }, 3900);
    }
  };

  useEffect(() => {
    HistoryScroll();
  }, [history]);

  const handleReset = () => {
    setItem(rank);
    setText(null);
    setRolled(null);
  };

  const handleRank = (e) => {
    if (e.target.id === "ShinyRing") {
      setShiny(true);
    } else {
      setShiny(false);
    }
    setBox(e.target.value);
    setRank(e.target.id);
    setItem(e.target.id);
    setHistory([]);
  };

  const handleMana = (e) => {
    setMana(!mana);
    setHistory([]);
  };

  const handleQuickRoll = (e) => {
    setQuickRoll(!quickRoll);
  };

  const handleClear = (e) => {
    setHistory([]);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleTargetItem = (e) => {
    setTargetItem(e.target.value)
    if (targetLevel === "none") {
      setTarget(e.target.value)
    } else {
      setTarget(`${e.target.value} (${targetLevel})`)
    }
  }
  const handleTargetLevel = (e) => {
    setTargetLevel(e.target.value)
    if (e.target.value === "none") {
      setTarget(targetItem)
    } else {
      setTarget(`${targetItem} (${e.target.value})`)
    }
  }

  function generateStatistics() {
    let rolls = []
    let count = 0
    for (let i = 0; i < 100000; i++) {
      const reward = generatePrize(rank, mana, undefined);
      let level = "";
      if (
        reward === "Broken Box Pieces" ||
        reward === "Oz Point Pouches" ||
        reward === "Ocean Glow Earrings" ||
        reward === "2x Experience Coupons"
      ) {
      } else {
        level = ` (${GenerateLevel(shiny)})`;
      }
      rolls.push(reward + level)
    }
    rolls.forEach(roll => {
      if (roll === `${target}`) {
        count++
      }
    })
    setAverage(count)
  }

  const handleStatistics = (e) => {
    e.preventDefault()
    generateStatistics()
  }

  const items = allRanks[rank].items;

  return (
    <div className="App">
      <div className="title">Oz Box Simulator</div>
      <p>created by Audi#5187 on discord</p>
      <div className="ui">
        <div className="box-ui">
          <div className="box-title">ALICIA'S BOX</div>
          <div className="box">
            <div className="opening">
              {text ? text : `OPENING A ${box} BOX`}
            </div>
            <div className="progress-bar">
              <ProgressBar variant="danger" now={loading} />
            </div>
            <div className="item">
              <img src={`/items/${item}.png`} alt="item"></img>
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
                return (
                  <div key={index} className={(target === item ? "target" : "")}>
                    {index + 1}. {item}
                  </div>
                );
              })}
            </div>
            <div className="history-bottom">
              <img
                src="reset-icon.png"
                alt="reset-icon"
                height="30px"
                width="auto"
                onClick={handleClear}
              ></img>
              <div className="total">Total Boxes Opened: {history.length}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="time">
        {(history.length > 0 && box !== "SHINY RING" && box !== "HIDDEN RING") && (
          <>
            <p>
              You have wasted ~{Math.ceil((time * history.length) / 60)}{" "}
              {Math.ceil((time * history.length) / 60) < 2 ? "hour" : "hours"}{" "}
              of your life
            </p>
            <p>in the Tower of Oz.</p>
          </>
        )}
      </div>
      <Card className="d-flex mx-auto form" style={{ width: "55vw" }}>
        <form>
          <h2>Settings</h2>
          <div>
            <input
              className="form-check-input"
              onChange={handleQuickRoll}
              type="checkbox"
              value=""
              id="quickRoll"
              checked={quickRoll}
            />
            <label className="form-check-label" htmlFor="quickRoll">
              Quick Open
            </label>
          </div>
          <br></br>
          <div>
            <label htmlFor="time">How long are your runs?</label>
            <input
              type="number"
              id="time"
              name="time"
              placeholder="mins"
              value={time}
              onChange={handleTime}
            />
            <label htmlFor="time">mins</label>
          </div>
          <br></br>
            This will highlight item in pull history.
          <div>
              <label htmlFor="targetItem">Target Item: </label>
                  <select id="targetItem" name="targetItem" onChange={handleTargetItem}>
                    <option value="none" default>Select an option</option>
                    <option value="Ring of Restraint">Ring of Restraint</option>
                    <option value="Weapon Jump">Weapon Jump</option>
                  </select>
          </div>
          <div>
              <label htmlFor="targetLevel">Target Level: </label>
                  <select id="targetLevel" name="targetLevel" onChange={handleTargetLevel}>
                    <option value="none" default>Select an option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
          </div>
          <br></br>
          {average && <div>
        Average: 1 in {Math.ceil(100000/average)} runs
      </div>
}
      <button onClick={handleStatistics}>
        Generate 100000 Box Average
      </button>
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
                value={true}
                defaultChecked
                disabled={disabled}
              />
              <label htmlFor="yesMana">Yes</label>
              <input
                type="radio"
                id="noMana"
                name="mana_or_none"
                value={false}
                disabled={disabled}
              />
              <label htmlFor="noMana">No</label>
            </div>
          </div>
          <div className="rankRadios" onChange={handleRank}>
            <h4>Box Rank</h4>
            <div className="radios">
              <div>
                <input
                  type="radio"
                  id="Rank1"
                  name="boxRank"
                  value="RANK 1"
                  defaultChecked
                  disabled={disabled}
                />
                <label htmlFor="Rank1">Rank 1</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Rank2"
                  name="boxRank"
                  value="RANK 2"
                  disabled={disabled}
                />
                <label htmlFor="Rank2">Rank 2</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="HiddenRing"
                  name="boxRank"
                  value="HIDDEN RING"
                  disabled={disabled}
                />
                <label htmlFor="HiddenRing">Hidden Ring Box</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ShinyRing"
                  name="boxRank"
                  value="SHINY RING"
                  disabled={disabled}
                />
                <label htmlFor="ShinyRing">Shiny Ring Box</label>
              </div>
            </div>
          </div>
        </form>
      </Card>
      <div className="rates">
        <div className="box-title">RATES</div>
        <div className="box">
          <div className="rate">
            Ring Rates
            {items.map((item) => {
              return (
                <div>
                  {item.item} :{" "}
                  {((mana ? item.reboot : item.noMana) * 100).toFixed(2)}%
                </div>
              );
            })}
            <br></br>
            <div>
              Level Rates
              {(!shiny ? normal : special).map((rate) => {
                return (
                  <div>
                    Level {rate.level} : {(rate.chance * 100).toFixed(2)}%
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
