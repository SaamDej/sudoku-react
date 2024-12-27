import React, { useState } from "react";

export type SudokuCellAttributes = {
  index: number;
  row: number;
  column: number;
  block: number;
  answer: number;
  displayNumber: number;
  prefilled: boolean;
};

interface SudokuCellProps {
  index: number;
  row: number;
  column: number;
  block: number;
  answer: number;
  size?: string;
  displayNumber: number;
  prefilled: boolean;
  conflict: boolean;
  shared: boolean;
  focused?: boolean;
  //focus: () => void;
  //keyPress: (e: React.KeyboardEvent) => void;
  cellRef: any;
  notes?: boolean[];
  showAnswer: boolean;
  onClick: () => void;
}

const SudokuCell = ({
  index,
  row,
  column,
  block,
  answer,
  size = "left",
  displayNumber,
  prefilled,
  conflict,
  shared,
  focused = false,
  //focus,
  //keyPress,
  onClick,
  cellRef,
  notes = Array(9).fill(false), //[false, false, false, false, false, false, false, false, false]
  showAnswer,
}: SudokuCellProps) => {
  // console.log("cell:" + showAnswer.toString());
  const borderTypes = [
    ["border-r-2 border-b-2", "border-b-2", "border-l-2 border-b-2"],
    ["border-r-2", "", "border-l-2"],
    ["border-r-2 border-t-2", "border-t-2", "border-l-2 border-t-2"],
  ];
  function calculateBorder(row: number, column: number) {
    const blockColumn = column % 3;
    const blockRow = row % 3;
    return borderTypes[blockRow][blockColumn];
  }
  const normalText = "select-none text-5xl font-semibold";
  const noteText = "select-none grid grid-cols-3 grid-rows-3 gap-x-4";
  const cellSize = `size-${size} flex items-center justify-center text-center outline-none box-content`;
  const cellDefault = `${focused ? "bg-yellow-200" : "bg-white"} text-blue-500`;
  const cellConflict =
    (!focused ? " bg-red-300 " : "bg-red-400 ") +
    (!prefilled ? " text-red-900" : "");
  const cellShared = !focused ? "bg-blue-300" : "bg-blue-400";
  const cellPrefilled = !focused ? "bg-white" : "bg-yellow-200";
  // const cellAnswerShown = showAnswer
  //   ? "opacitiy-100 text-blue-200 "
  //   : "opacity-0 ";
  function setDisplay(dn: number): string {
    return dn > 0 && dn < 10 ? dn.toString() : "";
  }

  const cellNotes = notes.map((note, i) =>
    note ? (
      <div
        className=" select-none text-base"
        key={"note-" + i + " cell-" + index}
      >
        {(i + 1).toString()}
      </div>
    ) : (
      <div
        className=" select-none text-base"
        key={"note-" + i + " cell-" + index}
      >
        {" "}
      </div>
    )
  );
  // const AnswerText() {
  //   return (

  //   );
  // }
  return (
    <div
      ref={cellRef}
      className={
        "transition ease-out " +
        cellSize +
        " " +
        (conflict
          ? cellConflict
          : shared
            ? cellShared
            : prefilled
              ? cellPrefilled
              : cellDefault) +
        " " +
        calculateBorder(row, column) +
        " border-slate-400"
      }
      //onFocus={focus}
      // onKeyDown={keyPress}
      //tabIndex={0}
      onClick={onClick}
    >
      {displayNumber > 0 && displayNumber < 10 ? (
        <p className={normalText + " z-10 "}>{setDisplay(displayNumber)}</p>
      ) : (
        <>
          <div className={noteText + " fixed"}>{cellNotes}</div>
        </>
      )}
      <p
        className={
          `transition-opacity ease-out fixed duration-300 z-0 text-blue-200 ${showAnswer && !prefilled && displayNumber == 0 ? "opacity-100" : "opacity-0"} ` +
          normalText
        }
      >
        {setDisplay(answer)}
      </p>
    </div>
  );
};

export default SudokuCell;
