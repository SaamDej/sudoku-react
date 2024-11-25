import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SudokuCellAttributes } from "./components/SudokuCell";
import SudokuBoard from "./components/SudokuBoard(OLD)";
import setBoardLayout from "./utilities/setBoardLayout";
import exampleBoard, { examplePrefill } from "./utilities/exampleBoard";
import NumPad from "./components/NumPad";
import checkEmpty from "./utilities/checkEmpty";

function App() {
  const keyMap = new Map();
  for (let i = 0; i < 9; i++) {
    keyMap.set(`Digit${i + 1}`, i + 1);
  }
  const refs = useRef<HTMLDivElement[]>([]);
  const [currentCell, setCurrentCell] = useState<SudokuCellAttributes | null>(
    null
  );
  const board: SudokuCellAttributes[] = useMemo(
    () => setBoardLayout(exampleBoard, examplePrefill),
    []
  );
  function shiftHold(e: KeyboardEvent) {
    if (e.key === "Shift" && !e.repeat) {
      setNoteMode((prev) => !prev);
    }
  }
  const [displayCells, setDisplayCells] = useState<number[]>(
    board.map((cell) => {
      return cell.displayNumber;
    })
  );
  const [notes, setNotes] = useState<boolean[][]>(
    Array.from({ length: 81 }, () => Array(9).fill(false))
  );
  const [noteMode, setNoteMode] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener("keydown", shiftHold);
    document.addEventListener("keyup", shiftHold);
    return () => {
      document.removeEventListener("keydown", shiftHold);
      document.removeEventListener("keyup", shiftHold);
    };
  }, []);

  return (
    <>
      <div className="flex items-center flex-col space-y-4">
        <h1 className="text-3xl font-sans">Sudoku React</h1>
        <button>How to Play</button>
        <SudokuBoard
          cellArray={board}
          dispArray={displayCells}
          notes={notes}
          setNotes={setNotes}
          setDispArray={setDisplayCells}
          setCurr={setCurrentCell}
          focus={() => {}}
          keyPress={(e) => {}}
          cellRefs={refs}
          noteMode={noteMode}
          keyMap={keyMap}
        />
        <div className="flex flex-row gap-x-5">
          <button
            className="rounded bg-blue-500 p-3 text-white text-lg hover:bg-blue-700"
            onClick={() => setNoteMode(!noteMode)}
          >
            Toggle Note Mode
          </button>
          <button
            className="rounded bg-blue-500 p-3 text-white text-l  hover:bg-blue-700"
            onMouseDown={(e: React.MouseEvent) => {
              e.preventDefault();
              if (currentCell) {
                if (!currentCell.prefilled) {
                  if (displayCells[currentCell.index] != 0) {
                    const newArray = displayCells.map((value, i) => {
                      if (i === currentCell.index) {
                        return 0;
                      } else return value;
                    });
                    setDisplayCells(newArray);
                  } else if (checkEmpty(notes[currentCell.index]) != true) {
                    const clearedArray = notes[currentCell.index].fill(false);
                    const newNotes = notes.map((noteArray, i) => {
                      if (i === currentCell.index) {
                        return clearedArray;
                      } else return noteArray;
                    });
                    setNotes(newNotes);
                  }
                }
              }
            }}
          >
            Clear Cell
          </button>
        </div>
        <p className="text-xl">Note Mode: {noteMode ? "ON" : "OFF"}</p>
      </div>
      <div>
        <NumPad
          currCell={currentCell}
          displayArray={displayCells}
          setDisplay={setDisplayCells}
          notes={notes}
          setNotes={setNotes}
          noteMode={noteMode}
        />
        <h1>{currentCell ? currentCell.index : "none"}</h1>
      </div>
      {console.count("counter")}
    </>
  );
}

export default App;
