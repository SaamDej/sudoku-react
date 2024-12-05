import React, { useState } from "react";

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
  size = "size-16",
  fontSize = "font-bold text-4xl",
  disabled = false,
  answerCount,
  onClick = (e: any) => {},
}: NumPadButtonprops) => {
  const [clicked, setClicked] = useState(false);

  const styles = {
    enabled: `bg-white hover:text-white ${clicked ? "hover:bg-blue-700" : "hover:bg-blue-500"}`,
    disabled: "bg-gray-300 text-gray-500",
  };
  return (
    <button
      className={`transition ease-in-out rounded-lg border-4 border-gray-700 ${size} ${fontSize} ${disabled ? styles.disabled : styles.enabled} `}
      disabled={answerCount < 9 ? false : true}
      onMouseDown={(e) => {
        onClick(e);
        setClicked(true);
      }}
      onMouseUp={() => {
        setClicked(false);
      }}
    >
      {number}
    </button>
  );
};

export default NumPadButton;
