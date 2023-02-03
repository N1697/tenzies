import React from "react";
import Confetti from "react-confetti";
import Dice from "./Dice";
import RollDiceBtn from "./RollDiceBtn";
import { nanoid } from "nanoid";

const Container = () => {
  const [allDice, setAllDice] = React.useState(allNewDice()); //Creates a state named 'allDice' with the default value of 'newDice'
  const [tenzies, setTenzies] = React.useState(false);
  const [roll, setRoll] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  if (seconds > 59) {
    setSeconds(0);
    setMinutes((minute) => minute + 1);
  }
  if (minutes > 59) {
    setMinutes(0);
    setHours((hours) => hours + 1);
  }
  if (hours > 23) {
    setHours(0);
  }

  React.useEffect(() => {
    let timer = setInterval(() => {
      if (!start) {
        return;
      }
      if (tenzies) {
        return;
      }

      setSeconds((second) => second + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, !tenzies]);

  //Checks if player won
  React.useEffect(() => {
    const allDiceHeld = allDice.every((die) => die.isHeld);
    const allDiceSameValue = allDice.every(
      (die) => die.value === allDice[0].value
    );

    if (allDiceHeld && allDiceSameValue) {
      setTenzies(true);
    }
  }, [allDice]);

  //Creates a new die
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  //Creates an array with 10 objects
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDice() {
    if (tenzies) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setRoll(0);
      setStart(false);
      setTenzies(false);
      setAllDice(allNewDice());
      return;
    }

    setAllDice(
      //else, holds chosen-die and generates new random number for other dice
      (prevAllDice) =>
        prevAllDice.map((prevDie) => {
          return prevDie.isHeld ? prevDie : generateNewDie();
          // if (!prevDice.isHeld) {
          //   //If the prevDice is still not held
          //   return generateNewDie(); //returns a new dice with random number
          // } else {
          //   //else, if the prevDice is already held, return it
          //   return prevDice;
          // }
        })
      //Ultimately, we'll have a new allDice array with both held-dice and not-held-dice
    );

    setRoll((roll) => roll + 1);

    // tenzies //If it's 'tenzies', flip 'tenzies' back to false and generates new allDice array (new game)
    //   ? setAllDice((prevAllDice) => {
    //       setTenzies((prevTenzies) => !prevTenzies);
    //       return allNewDice(); //prevAllDice.map(prevDie => generateNewDie());
    //     })
    //   : setAllDice(
    //       //else, holds chosen-die and generates new random number for other dice
    //       (prevAllDice) =>
    //         prevAllDice.map((prevDie) => {
    //           return prevDie.isHeld ? prevDie : generateNewDie();
    //           // if (!prevDice.isHeld) {
    //           //   //If the prevDice is still not held
    //           //   return generateNewDie(); //returns a new dice with random number
    //           // } else {
    //           //   //else, if the prevDice is already held, return it
    //           //   return prevDice;
    //           // }
    //         })
    //       //Ultimately, we'll have a new allDice array with both held-dice and not-held-dice
    //     );
  }

  function holdDice(id) {
    setStart(true);

    setAllDice((prevAllDice) =>
      prevAllDice.map((prevDie) => {
        // return prevDie.id === id
        //   ? { ...prevDie, isHeld: !prevDie.isHeld }
        //   : prevAllDice;

        //Maps over the old allDice array
        if (prevDie.id === id) {
          //If the id of each dice matches the passed-in id
          return {
            //returns a new dice with the 'isHeld' flipped
            ...prevDie,
            isHeld: !prevDie.isHeld,
          };
        } else {
          //else, returns the dice
          return prevDie;
        }
      })
    );
  }

  //Creates an array of 10 dice component
  const dice = allDice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="container">
      {tenzies && <Confetti style={{ width: "100%", height: "100%" }} />}
      <div className="text-container">
        <h1 className="title">
          <img src="/tenzies-icon.png" alt="tenzies" className="tenzies-icon" />
          Tenzies
          <img src="/tenzies-icon.png" alt="tenzies" className="tenzies-icon" />
        </h1>
        <p className="instructions" style={{ whiteSpace: "pre-wrap" }}>
          {/*style={{ whiteSpace: "pre-wrap" }} + \n = new line */}
          {tenzies
            ? "Congratulations!\nYou Won!"
            : "Roll until all dice are the same. \nClick each die to freeze it at its current value between rolls."}
        </p>
      </div>

      <div className="start-menu">
        <h1 className="timer">
          Timer: {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </h1>
        <h1 className="roll-counter">Counter: {roll}</h1>
      </div>

      <div className="dice-container">{dice}</div>
      <RollDiceBtn rollNewDice={generateNewDice} isTenzies={tenzies} />
    </div>
  );
};

export default Container;
