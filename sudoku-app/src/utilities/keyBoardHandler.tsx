import { SudokuCellAttributes } from "../components/SudokuCell";
import updateNotes from "./updateNotes";
//This function handles keyboard inputs when interacting with the sudoku cells.
// WASD and Arrow Keys used for navigation
// Holding Shift will toggle between Pencil (note) and Default input.
function keyBoardHandler(
  e: React.KeyboardEvent, // check expected
  index: number,
  prefilled: boolean,
  refCurrents: HTMLDivElement[],
  board: SudokuCellAttributes[],
  displayNumbers: number[],
  setDisplayNumbers: React.Dispatch<React.SetStateAction<number[]>>,
  setCurrentCell: React.Dispatch<
    React.SetStateAction<{
      attributes: SudokuCellAttributes;
      ref: HTMLDivElement;
    }>
  >,
  noteMode: boolean,
  notes: boolean[][],
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>,
  showAnswer: boolean,
  keyMap: Map<string, number>
) {
  console.log(showAnswer);
  function checkEmpty(arr: boolean[]) {
    return arr.every((i) => i === false);
  }
  const pressedKey: string = e.key.toLowerCase();
  switch (pressedKey) {
    case "w":
    case "arrowup": {
      if (refCurrents[index - 9])
        setCurrentCell({
          attributes: board[index - 9],
          ref: refCurrents[index - 9],
        });
      break;
    }
    case "a":
    case "arrowleft": {
      if (refCurrents[index - 1] && board[index - 1].row === board[index].row)
        setCurrentCell({
          attributes: board[index - 1],
          ref: refCurrents[index - 1],
        });
      break;
    }
    case "s":
    case "arrowdown": {
      if (refCurrents[index + 9]) {
        setCurrentCell({
          attributes: board[index + 9],
          ref: refCurrents[index + 9],
        });
      }
      break;
    }
    case "d":
    case "arrowright": {
      if (refCurrents[index + 1] && board[index + 1].row === board[index].row)
        setCurrentCell({
          attributes: board[index + 1],
          ref: refCurrents[index + 1],
        });
      break;
    }
    case "backspace": {
      if (!prefilled) {
        if (displayNumbers[index] != 0) {
          const newArray = displayNumbers.map((value, i) => {
            if (i === index) {
              return 0;
            } else return value;
          });
          setDisplayNumbers(newArray);
        } else if (checkEmpty(notes[index]) != true) {
          const clearedArray = notes[index].fill(false);
          const newNotes = notes.map((noteArray, i) => {
            if (i === index) {
              return clearedArray;
            } else return noteArray;
          });
          setNotes(newNotes);
        }
      }
      break;
    }
    default: {
      const parsedKey: number = keyMap.get(e.code) || 0;
      if (!prefilled) {
        if (noteMode) {
          if (
            displayNumbers[index] === 0 &&
            !Number.isNaN(parsedKey) &&
            parsedKey != 0
          ) {
            const cellNotesArray = notes[index].map((note, i) => {
              if (parsedKey != 0 && i === parsedKey - 1) {
                return !note;
              } else return note;
            });
            const newNotes = notes.map((noteArray, i) => {
              if (i === index) {
                return cellNotesArray;
              } else return noteArray;
            });
            setNotes(newNotes);
          }
        } else {
          if (
            !Number.isNaN(parsedKey) &&
            parsedKey != 0 &&
            displayNumbers[index].toString() != e.key
          ) {
            const newArray = displayNumbers.map((value, i) => {
              if (i === index) {
                return parsedKey;
              } else return value;
            });
            setDisplayNumbers(newArray);
            updateNotes(
              notes,
              setNotes,
              parsedKey,
              index,
              board[index].row,
              board[index].column,
              board[index].block,
              displayNumbers,
              board
            );
          }
        }
      }
      break;
    }
  }
}

export default keyBoardHandler;
