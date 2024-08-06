import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Die from "./components/Die";

const NUMBER_OF_DICE = 10;

function App() {
  // state variable declarations
  const [dice, setDice] = useState(initDice);

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
      <div className="dice-container">{diceComponents}</div>
      <button
        className="reroll-button"
        onClick={rerollDice}
      >
        Roll
      </button>
    </main>
  );

  // event handlers
  function rerollDice() {
    setDice(prevDice =>
      prevDice.map(die => {
        return die.isHeld ? die : { ...die, value: generateRandomDiceRoll() };
      })
    );
  }

  function holdDie(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        id === die.id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // helper functions
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
