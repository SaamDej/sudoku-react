import { CellNotes, SudokuCellAttributes } from "../types";
import { updateNotes, checkEmpty } from ".";
//This function handles keyboard inputs when interacting with the sudoku cells.
// WASD and Arrow Keys used for navigation
// Holding Shift will toggle between Pencil (note) and Default input.
function keyBoardHandler(
  e: React.KeyboardEvent,
  currentCell: number,
  board: SudokuCellAttributes[],
  displayNumbers: number[],
  setDisplayNumbers: React.Dispatch<React.SetStateAction<number[]>>,
  setCurrentCell: React.Dispatch<React.SetStateAction<number>>,
  noteMode: boolean,
  notes: CellNotes[],
  setNotes: React.Dispatch<React.SetStateAction<CellNotes[]>>,
  keyMap: Map<string, number>,
  disabled: boolean
) {
  if (disabled) {
    console.log("disabled");
    return;
  }

  const index = currentCell;
  const prefilled = board[index].prefilled;
  const pressedKey = e.key.toLowerCase();

  // Helper functions
  const moveToCell = (newIndex: number) => {
    if (!board[newIndex]) return; //return if next cell is non-existant

    setCurrentCell(newIndex); // set currentCell to new cell
  };

  const canMoveHorizontally = (newIndex: number): boolean => {
    return board[newIndex] && board[newIndex].row === board[index].row;
  }; // return true if next cell exists and it's on the same row.

  const clearCellValue = () => {
    if (displayNumbers[index] !== 0) {
      const newArray = displayNumbers.slice();
      newArray[index] = 0;
      setDisplayNumbers(newArray);
      setCurrentCell(index);
      return;
    } // if cell has a player-filled answer, only clear the answer.

    if (notes[index] && !checkEmpty(notes[index])) {
      const clearedArray = Array(9).fill(false);
      const newNotes = notes.map((noteArray, i) =>
        i === index ? clearedArray : noteArray
      );
      setNotes(newNotes);
    } // if cell has notes but no player-fill answer, clear all of its notes.
  };

  const handleNoteInput = (parsedKey: number) => {
    if (
      displayNumbers[index] !== 0 ||
      Number.isNaN(parsedKey) ||
      parsedKey === 0 ||
      !notes[index]
    ) {
      return;
    } // return if the cell is filled, key-input is not a number from 1 to 9,
    //   or notes are null.

    const cellNotesArray = notes[index].map((note, i) =>
      i === parsedKey - 1 ? !note : note
    ); // note array with changed note at current cell.

    const newNotes = notes.map((noteArray, i) =>
      i === index ? cellNotesArray : noteArray
    ); // notes array with updated notes at current cell.

    console.log(newNotes);
    setNotes(newNotes); // sets notes state.
  };

  const handleNumberInput = (parsedKey: number) => {
    if (
      Number.isNaN(parsedKey) ||
      parsedKey === 0 ||
      displayNumbers[index].toString() === e.key
    ) {
      return;
    } //  return if the input is not a number from 1 to 9
    //    or if its equal to the filled number.

    const newArray = displayNumbers.map((value, i) =>
      i === index ? parsedKey : value
    ); // array of displayed numbers

    setDisplayNumbers(newArray);
    setCurrentCell(index); // update display cells and current cell.

    const newNotes = updateNotes(
      notes,
      parsedKey,
      index,
      displayNumbers,
      board
    );
    setNotes(newNotes); // update notes after answer input.
  };

  // Navigation handlers
  const navigationHandlers = {
    w: () => moveToCell(index - 9),
    arrowup: () => moveToCell(index - 9),
    a: () => canMoveHorizontally(index - 1) && moveToCell(index - 1),
    arrowleft: () => canMoveHorizontally(index - 1) && moveToCell(index - 1),
    s: () => moveToCell(index + 9),
    arrowdown: () => moveToCell(index + 9),
    d: () => canMoveHorizontally(index + 1) && moveToCell(index + 1),
    arrowright: () => canMoveHorizontally(index + 1) && moveToCell(index + 1),
    backspace: () => !prefilled && clearCellValue(),
  };

  type NavigationKey = keyof typeof navigationHandlers;

  // Handle navigation and backspace
  const handler = navigationHandlers[pressedKey as NavigationKey];
  if (handler) {
    handler();
    return;
  }

  // Handle number input
  if (prefilled) return;

  const parsedKey = keyMap.get(e.code) || 0;

  if (noteMode && notes[index]) {
    handleNoteInput(parsedKey);
  } else {
    handleNumberInput(parsedKey);
  }
}

export default keyBoardHandler;
