import React from "react";
import NumPadButton from "./NumPadButton";
interface NumPad {}
const NumPad = () => {
  const buttonArray = new Array(9)
    .fill(null)
    .map((_, i) => (
      <NumPadButton key={`Numpad-${i + 1}`} number={i + 1} answerCount={5} />
    ));

  return <div className="flex justify-center gap-2">{buttonArray}</div>;
};

export default NumPad;
