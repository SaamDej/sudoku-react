import { CellNotes, SudokuCellAttributes } from "../types";
import checkEmpty from "./checkEmpty";
import { Dispatch, SetStateAction } from "react";
const eraseCell = (
  e: React.MouseEvent,
  currentCell: SudokuCellAttributes,
  displayCells: number[],
  setDisplayCells: Dispatch<SetStateAction<number[]>>,
  notes: CellNotes[],
  setNotes: Dispatch<SetStateAction<CellNotes[]>>
) => {
  e.preventDefault();

  if (!currentCell || currentCell.prefilled) return;
  const cellIndex = currentCell.index;
  if (displayCells[cellIndex] !== 0) {
    const newArray = displayCells.slice();
    newArray[cellIndex] = 0;
    setDisplayCells(newArray);
    return;
  }
  if (notes[cellIndex] && !checkEmpty(notes[cellIndex])) {
    const clearedArray = Array(9).fill(false);
    const newNotes = notes.map((noteArray, index) =>
      index === cellIndex ? clearedArray : noteArray
    );
    setNotes(newNotes);
  }
};

export default eraseCell;
