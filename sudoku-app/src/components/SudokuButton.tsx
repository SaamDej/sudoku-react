import React, { ReactElement, useState } from "react";

interface SudokuButtonProps {
  buttonStyle?: string;
  children: string | ReactElement;
  buttonMouseDown?: (e: any) => void;
  bgColor?: string;
  textColor?: string;
  bgActive?: string;
  textHover?: string;
  bgHover?: string;
}
const SudokuButton = ({
  buttonStyle = "",
  children,
  bgColor = "bg-green-500",
  textColor = "text-white",
  textHover = "text-white",
  bgActive = "hover:bg-green-700",
  bgHover = "hover:bg-green-600",
  buttonMouseDown = () => {},
}: SudokuButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const buttonStyleString = `${buttonStyle} ${bgColor} ${textColor} ${pressed ? bgActive : bgHover}`;
  return (
    <button
      className={buttonStyleString}
      onClick={(e) => {
        buttonMouseDown(e);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => {
        setPressed(false);
      }}
      onMouseLeave={() => {
        setPressed(false);
      }}
    >
      {children}
    </button>
  );
};

export default SudokuButton;
