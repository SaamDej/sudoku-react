import React, { useRef, useState } from "react";
import SudokuCell, { SudokuCellAttributes } from "./SudokuCell";
import keyBoardHandler from "../utilities/keyBoardHandler";
import conflictHandler from "../utilities/conflictHandler";
interface SudokuBoardProps {
  cellArray: SudokuCellAttributes[];
  dispArray: number[];
  setDispArray: React.Dispatch<React.SetStateAction<number[]>>;
  setCurr: React.Dispatch<React.SetStateAction<SudokuCellAttributes | null>>;
  focus: () => void;
  keyPress: (e: React.KeyboardEvent) => void;
  cellRefs: any;
  noteMode?: boolean;
  keyMap: Map<string, number>;
}

const SudokuBoard = ({
  cellArray,
  dispArray,
  setDispArray,
  setCurr,
  focus,
  keyPress,
  cellRefs,
  noteMode = false,
  keyMap,
}: SudokuBoardProps) => {
  // const refs = useRef<HTMLDivElement[]>([]);

  // const [displayCells, setDisplayCells] = useState<number[]>(
  //   cellArray.map((cell) => {
  //     return cell.displayNumber;
  //   })
  // );

  const [notes, setNotes] = useState<boolean[][]>(
    Array.from({ length: 81 }, () => Array(9).fill(false))
  );

  const cells = cellArray.map((cell, index) => (
    <SudokuCell
      index={cell.index}
      row={cell.row}
      column={cell.column}
      block={cell.block}
      answer={cell.answer}
      displayNumber={dispArray[index]}
      prefilled={cell.prefilled}
      conflict={
        dispArray[cell.index] != 0
          ? conflictHandler(
              cell.row,
              cell.column,
              cell.block,
              cell.index,
              dispArray,
              cellArray
            )
          : false
      }
      shared={false}
      size={"left"}
      focus={() => {
        setCurr(cell);
      }}
      keyPress={(e) => {
        keyBoardHandler(
          e,
          cell.index,
          cell.prefilled,
          cellRefs.current,
          cellArray,
          dispArray,
          setDispArray,
          noteMode,
          notes,
          setNotes,
          keyMap
        );
      }}
      cellRef={(cell: any) => cellRefs.current.push(cell)}
      notes={notes[index]}
      key={index}
    />
  ));

  return (
    <>
      <div className="sudoku-board border-black bg-black border-4 ">
        {/* <div className="z-10 size-full box-border bg-gray-500"></div> */}
        <div className="board-grid">{cells}</div>
      </div>
      {/* {console.count("sudokuBoard")} */}
    </>
  );
};

export default SudokuBoard;
