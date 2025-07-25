import { SudokuCellAttributes, CellNotes } from "../types";
import { checkEmpty } from ".";

function updateNotes(
  notes: CellNotes[],
  cellInput: number,
  cellIndex: number,
  displayNumbers: number[],
  board: SudokuCellAttributes[]
): CellNotes[] {
  const row = board[cellIndex].row;
  const column = board[cellIndex].column;
  const block = board[cellIndex].block;

  // let newNotes: CellNotes[] = displayNumbers.map((displayNum, i) => {
  //   if (notes[i] != Array(9).fill(false) && i != cellIndex) {
  //     if (
  //       board[i].row === row ||
  //       board[i].column === column ||
  //       board[i].block === block
  //     ) {
  //       let noteCell = notes[i].map((note, j) => {
  //         if (note === true && j === cellInput - 1) {
  //           return false;
  //         } else {
  //           return note;
  //         }
  //       });
  //       return noteCell;
  //     }
  //   }
  //   return notes[i];
  // });
  const newNotes: CellNotes[] = notes.map((notesArray, i) => {
    if (
      //notesArray === Array(9).fill(false) ||
      checkEmpty(notesArray) ||
      notesArray === null ||
      i === cellIndex
    ) {
      // console.log(i + ": emtpy or same as current");
      return notesArray;
    }
    if (
      board[i].row === row ||
      board[i].column === column ||
      board[i].block === block
    ) {
      if (notesArray[cellInput - 1] !== true) {
        console.log(i + ": cell input not found on this cell");
        return notesArray;
      }
      const noteCell = notesArray.slice();
      noteCell[cellInput - 1] = false;

      // let noteCell = notesArray.map((note, j) => {
      //   if (note === true && j === cellInput - 1) return false;
      //   else return note;
      // });
      return noteCell;
    } else return notesArray;
    // if (n.notes == Array(9).fill(false) || n.boardIndex === cellIndex) return n;
    // if (
    //   board[n.boardIndex].row === row ||
    //   board[n.boardIndex].column === column ||
    //   board[n.boardIndex].block === block
    // ) {
    //   let noteCell = n.notes.map((note, j) => {
    //     if (note === true && j === cellInput - 1) {
    //       return false;
    //     } else {
    //       return note;
    //     }
    //   });
    //   return { boardIndex: n.boardIndex, notes: noteCell };
    // } else {
    //   return n;
    // }
  });
  return newNotes;
}

export default updateNotes;
