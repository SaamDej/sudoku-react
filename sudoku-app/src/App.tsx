import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SudokuCellAttributes } from "./components/SudokuCell";
import SudokuBoard from "./components/SudokuBoard(OLD)";
import setBoardLayout from "./utilities/setBoardLayout";
import exampleBoard, { examplePrefill } from "./utilities/exampleBoard";
import NumPad from "./components/NumPad";
import checkEmpty from "./utilities/checkEmpty";
import Modal from "./components/Modal";
import { Switch } from "@headlessui/react";

function App() {
  const refs = useRef<HTMLDivElement[]>([]);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noteMode, setNoteMode] = useState<boolean>(false);
  const [notes, setNotes] = useState<boolean[][]>(
    Array.from({ length: 81 }, () => Array(9).fill(false))
  );
  const [currentCell, setCurrentCell] = useState<{
    attributes: SudokuCellAttributes;
    ref: HTMLDivElement;
  } | null>(null);
  const board: SudokuCellAttributes[] = useMemo(
    () => setBoardLayout(exampleBoard, examplePrefill),
    []
  );
  // const showAnswersArray: number[] = board.map((cell) => cell.answer);

  const [displayCells, setDisplayCells] = useState<number[]>(
    board.map((cell) => {
      return cell.displayNumber;
    })
  );
  const [conflicts, setConflicts] = useState<boolean[]>(Array(81).fill(false));
  const keyMap = new Map();
  for (let i = 0; i < 9; i++) {
    keyMap.set(`Digit${i + 1}`, i + 1);
  }
  // useEffect(() => {
  //   function focus(e: any) {
  //     if (
  //       refs.current &&
  //       currentCell &&
  //       !refs.current[currentCell.attributes.index].contains(e.currentTarget)
  //     ) {
  //       setCurrentCell(null);
  //     }
  //   }
  //   document.addEventListener("mousedown", focus);
  //   return () => {
  //     document.removeEventListener("mousedown", focus);
  //   };
  // });
  function shiftHold(e: KeyboardEvent) {
    if (e.key === "Shift" && !e.repeat) {
      setNoteMode((prev) => !prev);
    }
  }
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
        <button
          className={
            "bg-green-500 text-white p-2 rounded-xl hover:bg-green-700"
          }
          onClick={() => setIsModalOpen(true)}
        >
          How to Play
        </button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <>
            <p className="pt-3 text-left">
              Sudoku is a puzzle game where the player must fill every empty
              cell (square) on a <b>9 x 9 cell grid</b> split into a{" "}
              <b>3 x 3 grid of cell blocks</b> (each being a 3 x 3 cell grid)
              with <b>a number between 1 and 9</b>. Some of the cells have their
              answers already given. These <b>prefilled cells</b> are indicated
              by their answers being displayed in <b>black</b> and{" "}
              <b>cannot be edited</b>. Numbers inputted into empty (editable)
              cells will be displayed with a{" "}
              <b className="text-blue-500">blue color</b> to indicate that they
              have been <b>inputted by the player</b>.
            </p>
            <h1 className="text-xl font-semibold underline">Rules</h1>
            <p>
              When filling a cell, the player must make sure that the answer
              does not conflict with the following condition based on the
              numbers 1 through 9.
            </p>
            <p className="font-bold text-red">
              A given number cannot appear in any cell block, column, and/or row
              more than once.
            </p>
            <p>
              If the player inputs an answer which conflicts with this condition
              based on the filled cells (both prefilled and player-inputted),
              the <b>conflicting cells</b> will be{" "}
              <b className="text-red-500">highlighted red</b>.
            </p>
            <p>
              Once the player{" "}
              <b>fills every empty cell without having any conflicting cells</b>
              , the puzzle is <b className="text-green-600">complete</b>.
            </p>
            <h1 className="text-xl font-semibold underline">Controls</h1>
            <p>
              The Sudoku grid can be interacted with via{" "}
              <b>keyboard and/or onscreen controls</b>.
            </p>
            <p>
              <b className="underline">Selecting a cell :</b> Any cell on the
              grid can be selected by either{" "}
              <b>clicking on cell the with the mouse pointer</b>, or by pressing
              the <b> Tab Key to focus the grid</b>, and navigating using the
              following keys:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <b>W / Up Arrow</b> : Selects the cell above the current cell.
              </li>
              <li>
                <b>A / Left Arrow</b> : Selects the cell below.
              </li>
              <li>
                <b>S / Down Arrow</b> : Selects the cell to the left.
              </li>
              <li>
                <b>D / Right Arrow</b> : Selects the cell to the right.
              </li>
            </ul>
            <p>
              <b className="underline">Fill a cell :</b> Once a fillable cell
              has been selected, press any of the <b>number keys (1-9)</b>, or
              <b> click on one of the nine number buttons</b> below the grid
              with the mouse pointer.
            </p>
            <p>
              <b className="underline">Clear a cell :</b> Press the{" "}
              <b>Backspace key</b>, or <b>click the "clear cell" button</b>,
              with a cell selected.
            </p>
            <p>
              <b className="underline">Note Mode :</b> This feature allows the
              player to <b>record the potential answers</b> of an empty cell
              without actually filling it with an answer. Any numbers inputted
              into an empty cell with Note mode <b>enabled</b> will{" "}
              <b>mark the cell with a "note"</b> of that number, allowing for{" "}
              <b>multiple notes on one cell</b>. <b>Hold the Shift key</b> to
              switch Note mode on (or off) until the key is released.{" "}
              <b>Click the "Note mode" button</b> below the grid to toggle Note
              mode on or off. Notes can be cleared with the same controls as
              listed above. By default Note mode is off.
            </p>
          </>
        </Modal>
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
          showAnswers={showAnswers}
          keyMap={keyMap}
        />
        <div className="flex flex-row gap-x-5">
          {/* <button
            className="rounded-xl bg-blue-500 p-3 min-w-48 text-white text-lg hover:bg-blue-700"
            onClick={() => setNoteMode(!noteMode)}
          >
            Toggle Note Mode
          </button> */}
          <div className="flex flex-col items-center">
            Note Mode
            <Switch
              checked={noteMode}
              onChange={() => setNoteMode(!noteMode)}
              className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-gray-300 data-[checked]:bg-blue-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
            >
              <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-8" />
            </Switch>
          </div>
          <button
            className="rounded-xl bg-red-500 p-3 text-white text-lg  hover:bg-red-700"
            onMouseDown={(e: React.MouseEvent) => {
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
                  } else if (
                    checkEmpty(notes[currentCell.attributes.index]) != true
                  ) {
                    const clearedArray =
                      notes[currentCell.attributes.index].fill(false);
                    const newNotes = notes.map((noteArray, i) => {
                      if (i === currentCell.attributes.index) {
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
          {/* <button
            className="rounded-xl bg-blue-500 p-3 text-white text-center hover:bg-blue-700 min-w-48 text-lg"
            onMouseDown={() => {
              setShowAnswers(!showAnswers);
            }}
          >
            {showAnswers ? "Hide" : "Show"} Answers
          </button> */}
          <div className="flex flex-col items-center">
            Show Answers
            <Switch
              checked={showAnswers}
              onChange={() => {
                setShowAnswers(!showAnswers);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-gray-300 data-[checked]:bg-blue-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
            >
              <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-8" />
            </Switch>
          </div>
        </div>
        {/* <p className="text-xl">Note Mode: {noteMode ? "ON" : "OFF"}</p> */}
      </div>
      <div className="pt-3">
        <NumPad
          currCell={currentCell}
          displayArray={displayCells}
          setDisplay={setDisplayCells}
          notes={notes}
          setNotes={setNotes}
          noteMode={noteMode}
          board={board}
        />
        <h1 className="pt-3">
          Currently Selected Cell:{" "}
          {currentCell ? currentCell.attributes.index : "none"}
        </h1>
      </div>
      {console.count("counter")}
    </>
  );
}

export default App;
