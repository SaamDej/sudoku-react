import React from "react";

interface NumPadButtonprops {
  number: number;
  size?: string;
  fontSize?: string;
  disabled?: boolean;
  answerCount: number;
}

const NumPadButton = ({
  number,
  size = "size-24",
  fontSize = "font-bold text-4xl",
  disabled = false,
  answerCount,
}: NumPadButtonprops) => {
  const styles = {
    enabled: "bg-white hover:text-white hover:bg-blue-500",
    disabled: "bg-gray-300 text-gray-500",
  };
  return (
    <button
      className={`rounded-lg border-4 border-gray-700 ${size} ${fontSize} ${disabled ? styles.disabled : styles.enabled} `}
      disabled={answerCount < 9 ? false : true}
    >
      {number}
    </button>
  );
};

export default NumPadButton;
