import React from "react";

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
  const styles = {
    enabled:
      "transition ease-in-out bg-white hover:text-white hover:bg-blue-500",
    disabled: "bg-gray-300 text-gray-500",
  };
  return (
    <button
      className={`rounded-lg border-4 border-gray-700 ${size} ${fontSize} ${disabled ? styles.disabled : styles.enabled} `}
      disabled={answerCount < 9 ? false : true}
      onMouseDown={onClick}
    >
      {number}
    </button>
  );
};

export default NumPadButton;
