import { memo, ReactElement, useState } from "react";

interface SudokuButtonProps {
  buttonStyle?: string;
  bgColorStyle?: string;
  bgHoverStyle?: string;
  bgActiveStyle?: string;
  textColorStyle?: string;
  textHoverStyle?: string;
  textActiveStyle?: string;
  disabledStyle?: string;
  label?: string;
  disabled?: boolean;
  children: string | ReactElement;
  onClick?: (e: any) => void;
}
const SudokuButton = memo(
  ({
    buttonStyle = "",
    bgColorStyle = "bg-sdk-blue-600",
    bgHoverStyle = "hover:bg-sdk-blue-500",
    bgActiveStyle = "active:bg-sdk-blue-700",
    textColorStyle = "text-sdk-neutral-100",
    textHoverStyle = "hover:text-sdk-neutral-100",
    textActiveStyle = "active:text-sdk-neutral-100",
    disabledStyle = "disabled:bg-sdk-neutral-400 disabled:text-sdk-neutral-300",
    label = "button",
    disabled = false,
    children,
    onClick = () => {},
  }: SudokuButtonProps) => {
    const buttonStyleString = `${buttonStyle} 
  ${bgColorStyle} ${bgHoverStyle} ${bgActiveStyle} 
  ${textColorStyle} ${textHoverStyle} ${textActiveStyle} 
  ${disabledStyle}`;
    return (
      <button
        className={buttonStyleString}
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default SudokuButton;
