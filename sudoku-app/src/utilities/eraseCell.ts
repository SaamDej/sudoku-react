import { SudokuCellAttributes } from "../components/SudokuCell";
import checkEmpty from "./checkEmpty";
const eraseCell = (
  e: React.MouseEvent,
  currentCell: {
    attributes: SudokuCellAttributes;
    ref: HTMLDivElement;
  },
  displayCells: number[],
  setDisplayCells: React.Dispatch<React.SetStateAction<number[]>>,
  notes: boolean[][],
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>
) => {
  e.preventDefault();
  if (currentCell) {
    if (!currentCell.attributes.prefilled) {
      if (displayCells[currentCell.attributes.index] != 0) {
        const newArray = displayCells.map((value, i) => {
          if (i === currentCell.attributes.index) {
            return 0;
          } else return value;
        });
        setDisplayCells(newArray);
      } else if (checkEmpty(notes[currentCell.attributes.index]) != true) {
        const clearedArray = notes[currentCell.attributes.index].fill(false);
        const newNotes = notes.map((noteArray, i) => {
          if (i === currentCell.attributes.index) {
            return clearedArray;
          } else return noteArray;
        });
        setNotes(newNotes);
      }
    }
  }
};

export default eraseCell;
