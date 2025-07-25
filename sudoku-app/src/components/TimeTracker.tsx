import { memo, useMemo, useState } from "react";
import useTime from "../hooks/useTime";
import SudokuButton from "./SudokuButton";
import { Pause, Play } from "./svg";
import CustomSVG from "./CustomSVG";

interface TimeTrackerProps {
  isPaused: boolean;
  onClick: () => void;
  getTime: (time: string) => void;
  //seconds: number;
}

const TimeTracker = memo(({ isPaused, onClick, getTime }: TimeTrackerProps) => {
  const time = useTime(isPaused, 0);
  const timeSpans = useMemo(
    () =>
      [...time].map((char, index) => (
        <span
          key={"char" + index}
          className={`font-semibold inline-block text-center ${char === ":" ? "" : "w-[1ch]"}`}
        >
          {char}
        </span>
      )),
    [time]
  ); /** Each digit of the clock is placed in its own span to prevent the text of the clock
         from shifting and changing width since the font is not monospaced. */
  return (
    <>
      {/* Component Wrapper */}
      <div
        className={"flex flex-row m-0 w-[200px] justify-center items-center"}
      >
        {/* Clock Text */}
        <div className=" inline-block text-center pr-1 text-lg lg:text-xl">
          {timeSpans}
        </div>
        {/* Pause Button Wrapper */}
        <div className="relative ml-2 inline-flex items-center">
          <SudokuButton
            label={isPaused ? "Play" : "Pause"}
            buttonStyle="group transition-colors rounded-full border-2 border-sdk-blue-600 size-10 lg:size-10"
            bgColorStyle="bg-sdk-blue-200"
            bgHoverStyle="hover:bg-sdk-blue-100"
            bgActiveStyle="active:bg-sdk-blue-600"
            onClick={() => {
              onClick();
              if (!isPaused) getTime(time);
            }}
          >
            <div className=" flex items-center justify-center">
              {isPaused ? (
                <CustomSVG
                  className="lg:size-8 fill-sdk-blue-600 group-hover:fill-sdk-blue-500 group-active:fill-sdk-blue-100 /group-active:scale-125 transition-all "
                  viewBox="0 0 24 24"
                >
                  <Play />
                </CustomSVG>
              ) : (
                <CustomSVG
                  className="lg:size-8 fill-sdk-blue-600 group-hover:fill-sdk-blue-500 group-active:fill-sdk-blue-100 /group-active:scale-125 transition-all"
                  strokeWidth="3"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <Pause />
                </CustomSVG>
              )}
            </div>
          </SudokuButton>
        </div>
      </div>
    </>
  );
});

export default TimeTracker;
