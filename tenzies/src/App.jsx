import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from "react-confetti";

const NUMBER_OF_DICE = 10;

function App() {
  // state variable declarations
  const [dice, setDice] = useState(initDice);
  const [tenzies, setTenzies] = useState(false);

  // effects
  useEffect(() => {
    if (dice.length === 0) return;

    const firstDieValue = dice[0].value;
    const isWin = dice.every(die => die.value === firstDieValue && die.isHeld);

    if (isWin) {
      setTenzies(true);
    }
  }, [dice]);

  // generating elements
  const diceComponents = dice.map((die, index) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  // returning the markup
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="subtitle">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceComponents}</div>
      <button
        className="reroll-button"
        onClick={rerollDice}
      >
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  );

  // event handlers
  function rerollDice() {
    if (tenzies) {
      resetGame();
    } else {
      setDice(prevDice =>
        prevDice.map(die => {
          return die.isHeld ? die : { ...die, value: generateRandomDiceRoll() };
        })
      );
    }
  }

  function holdDie(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        id === die.id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // helper functions
  function resetGame() {
    setTenzies(false);
    setDice(initDice());
  }

  function initDice() {
    let dice = [];

    for (let i = 0; i < NUMBER_OF_DICE; i++) {
      dice.push({
        id: nanoid(),
        value: generateRandomDiceRoll(),
        isHeld: false,
      });
    }

    return dice;
  }

  function generateRandomDiceRoll() {
    return Math.ceil(Math.random() * 6);
  }
}

export default App;
