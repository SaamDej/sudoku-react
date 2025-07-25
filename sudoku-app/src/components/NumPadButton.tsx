import React, { useState } from "react";
/**
 * This Component has been replaced with SudokuButton for now.
 */
interface NumPadButtonprops {
  number: number;
  size?: string;
  fontSize?: string;
  disabled?: boolean;
  answerCount: number;
  onClick?: (e: any) => void;
}

const NumPadButton = ({
  number,
  size = "size-12 md:size-20 sm:size-16",
  fontSize = "font-bold text-3xl lg:text-4xl",
  disabled = false,
  answerCount,
  onClick = (e: any) => {},
}: NumPadButtonprops) => {
  const [clicked, setClicked] = useState(false);

  const styles = {
    enabled: `bg-white hover:text-white ${clicked ? "hover:text-5xl hover:bg-blue-700" : "hover:bg-blue-500"}`,
    disabled: "bg-gray-300 text-gray-500",
  };
  return (
    <button
      className={`transition-all ease-in-out rounded-lg border-4 border-gray-700 ${size} ${fontSize} ${disabled ? styles.disabled : styles.enabled} `}
      disabled={answerCount < 9 ? false : true}
      onMouseDown={() => {
        setClicked(true);
      }}
      onMouseUp={(e) => {
        onClick(e);
        setClicked(false);
      }}
      onMouseLeave={() => {
        setClicked(false);
      }}
    >
      {number}
    </button>
  );
};

export default NumPadButton;
