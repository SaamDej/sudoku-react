import { memo, useMemo } from "react";
import { CellNotes, SudokuCellAttributes } from "../types";
import { BORDER_TYPES, calculateBorder, setDisplay } from "../utilities";

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
  notes?: CellNotes | null;
  showAnswer: boolean;
  onClick: (index: number) => void;
}

const SudokuCell = memo(
  ({
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
    onClick,
    notes,
    showAnswer,
  }: SudokuCellProps) => {
    const styleClasses = {
      normalText: "cell-text select-none font-bold ",
      noteText: "select-none grid grid-cols-3 grid-rows-3 w-full",
      cellSize: `${size} flex items-center justify-center text-center box-content outline-none`,
      cellDefault: `${focused ? "bg-sdk-yellow-300" : "bg-sdk-neutral-100"} text-sdk-blue-600`,
      cellConflict:
        (!focused ? " bg-sdk-red-200 " : "bg-sdk-yellow-300 ") +
        (!prefilled ? " text-sdk-red-700" : ""),
      cellShared:
        `delay-100 ${!focused ? " bg-sdk-blue-200 " : "bg-blue-600 "}` +
        `${!prefilled ? " text-sdk-blue-600" : ""}`,
      cellPrefilled: !focused ? "bg-sdk-neutral-100" : "bg-sdk-yellow-300",
    };

    const cellNotes = notes
      ? notes.map((note, i) =>
          note ? (
            <div
              className=" select-none text-[7px] min-[322px]:text-[8px] min-[412px]:text-[10px] min-[484px]:text-[12px] text-base"
              key={"note-" + i + " cell-" + index}
            >
              {(i + 1).toString()}
            </div>
          ) : (
            <div
              className={`note-${i + 1} select-none text-base`}
              key={"note-" + i + " cell-" + index}
            >
              {" "}
            </div>
          )
        )
      : null;
    let cellColor: string = styleClasses.cellDefault;
    if (conflict) {
      cellColor = styleClasses.cellConflict;
    } else if (shared) {
      cellColor = styleClasses.cellShared;
    } else if (prefilled) {
      cellColor = styleClasses.cellPrefilled;
    }

    //console.log(index);

    return (
      <div
        className={
          `cell-${index} ` +
          "transition ease-out " +
          styleClasses.cellSize +
          " " +
          cellColor +
          " " +
          calculateBorder(BORDER_TYPES, row, column) +
          " border-slate-400"
        }
        onClick={() => {
          //console.log("ONCLICK");
          if (!focused) {
            onClick(index);
          }
        }}
        onTouchStart={() => {
          //console.log("ONTOUCHSTART");
          if (!focused) {
            onClick(index);
          }
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
        }}
      >
        {displayNumber > 0 && displayNumber < 10 ? (
          <p className={styleClasses.normalText + " z-10 "}>
            {setDisplay(displayNumber)}
          </p>
        ) : (
          <>
            {notes !== null && (
              <div className={styleClasses.noteText}>{cellNotes}</div>
            )}
          </>
        )}
        <p
          className={
            `transition-opacity ease-out z-0 absolute duration-300 text-blue-200 ${showAnswer && !prefilled && displayNumber == 0 ? "opacity-100" : "opacity-0"} ` +
            styleClasses.normalText
          }
        >
          {setDisplay(answer)}
        </p>
      </div>
    );
  }
);

export default SudokuCell;
