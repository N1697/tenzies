import React from "react";

const RollDiceBtn = (props) => {
  return (
    <button className="roll-dice-btn" onClick={props.rollNewDice}>
      {props.isTenzies ? "New Game" : "ROLL"}
    </button>
  );
};

export default RollDiceBtn;
