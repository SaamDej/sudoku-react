import { useEffect, useMemo } from "react";
import { CustomSVG, SudokuButton, SVG } from ".";
interface NumPadProps {
  disabled?: boolean;
  onClick: (i: any) => void;
  eraseHandler: () => void;
}

const buttonClasses = {
  bgColor: "bg-sdk-blue-500",
  textColor: "text-sdk-neutral-100",
  textHover: "hover:text-sdk-neutral-100",
  textActive: " active:text-sdk-neutral-100",
  bgActive: "active:bg-sdk-blue-600",
  bgHover: "hover:bg-sdk-blue-400",
  buttonStyle:
    "transition-colors ease-in-out select-none rounded-lg h-12 lg:size-18 justify-center items-center font-bold lg:text-5xl/0.25 text-2xl/0.25",
  disabled: "disabled:bg-sdk-neutral-300 disabled:text-sdk-neutral-500",
};

const NumPad = ({ disabled = false, onClick, eraseHandler }: NumPadProps) => {
  const buttonArray = useMemo(
    () =>
      new Array(9).fill(null).map((_, i) => (
        <SudokuButton
          key={`Numpad-${i + 1}`}
          buttonStyle={buttonClasses.buttonStyle}
          bgColorStyle={buttonClasses.bgColor}
          textColorStyle={buttonClasses.textColor}
          textHoverStyle={buttonClasses.textHover}
          textActiveStyle={buttonClasses.textActive}
          bgActiveStyle={buttonClasses.bgActive}
          bgHoverStyle={buttonClasses.bgHover}
          disabledStyle={buttonClasses.disabled}
          onClick={() => onClick(i)}
        >
          {(i + 1).toString()}
        </SudokuButton>
      )),
    [onClick]
  );

  // useEffect(() => {
  //   console.log("component rerendered");
  // });

  return (
    <div className="grid grid-cols-5 gap-2 lg:grid-cols-3">
      {buttonArray}
      <SudokuButton
        buttonStyle="group transition flex justify-center items-center h-12 rounded-lg p-3 text-lg lg:hidden"
        bgColorStyle="bg-sdk-red-500"
        bgHoverStyle="hover:bg-sdk-red-400"
        bgActiveStyle="active:bg-sdk-red-600"
        textColorStyle="text-sdk-neutral-100"
        textHoverStyle="text-sdk-neutral-100"
        disabled={disabled}
        onClick={eraseHandler}
      >
        <CustomSVG className="size-6 lg:size-8 transition-all /group-active:scale-125">
          <SVG.Eraser />
        </CustomSVG>
      </SudokuButton>
    </div>
  );
};

export default NumPad;
