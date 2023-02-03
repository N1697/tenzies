import React from "react";
import { nanoid } from "nanoid";

const Dice = (props) => {
  const faces = [
    //Each array represents each face from 1 - 6
    [<div key={nanoid()} className="dot center middle one"></div>],

    [
      <div key={nanoid()} className="dot top right"></div>,
      <div key={nanoid()} className="dot bottom left"></div>,
    ],

    [
      <div key={nanoid()} className="dot top right"></div>,
      <div key={nanoid()} className="dot center middle"></div>,
      <div key={nanoid()} className="dot bottom left"></div>,
    ],

    [
      <div key={nanoid()} className="dot left top"></div>,
      <div key={nanoid()} className="dot top right"></div>,
      <div key={nanoid()} className="dot bottom left"></div>,
      <div key={nanoid()} className="dot bottom right"></div>,
    ],

    [
      <div key={nanoid()} className="dot left top"></div>,
      <div key={nanoid()} className="dot top right"></div>,
      <div key={nanoid()} className="dot center middle"></div>,
      <div key={nanoid()} className="dot bottom left"></div>,
      <div key={nanoid()} className="dot bottom right"></div>,
    ],

    [
      <div key={nanoid()} className="dot left top"></div>,
      <div key={nanoid()} className="dot top right"></div>,
      <div key={nanoid()} className="dot center left"></div>,
      <div key={nanoid()} className="dot center right"></div>,
      <div key={nanoid()} className="dot bottom left"></div>,
      <div key={nanoid()} className="dot bottom right"></div>,
    ],
  ];

  let face = faces[props.value - 1]; //Gets the array in 'faces' at index of props.value-1

  return (
    <div
      className={`die ${props.isHeld ? "die-held" : ""}`}
      onClick={props.holdDice}
    >
      {face}
    </div>
  );
};

export default Dice;
