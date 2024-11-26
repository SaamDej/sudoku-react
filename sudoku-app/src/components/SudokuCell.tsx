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
  focus: () => void;
  keyPress: (e: React.KeyboardEvent) => void;
  cellRef: any;
  notes?: boolean[];
  showAnswer: boolean;
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
  focus,
  keyPress,
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
  const cellSize =
    "size-16 flex items-center justify-center text-center outline-none box-content";
  const cellDefault = "bg-white focus:bg-yellow-200 text-blue-500";
  const cellConflict =
    " bg-red-400 focus:bg-red-500 " + (!prefilled ? " text-red-900" : "");
  const cellShared = "bg-blue-300 focus:bg-blue-400";
  const cellPrefilled = "bg-white focus:bg-yellow-200";
  const cellAnswerShown = "text-blue-200";
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
  function AnswerText() {
    return (
      <p className={normalText + " " + cellAnswerShown}>{setDisplay(answer)}</p>
    );
  }
  return (
    <div
      ref={cellRef}
      className={
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
      onFocus={focus}
      onKeyDown={keyPress}
      tabIndex={0}
    >
      {displayNumber > 0 && displayNumber < 10 ? (
        <p className={normalText}>{setDisplay(displayNumber)}</p>
      ) : (
        <>
          {showAnswer && displayNumber === 0 && <AnswerText></AnswerText>}
          <div className={noteText + " fixed"}>{cellNotes}</div>
        </>
      )}
    </div>
  );
};

export default SudokuCell;
