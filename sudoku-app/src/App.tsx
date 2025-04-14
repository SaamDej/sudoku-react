import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import SudokuCell, { SudokuCellAttributes } from "./components/SudokuCell";
import setBoardLayout from "./utilities/setBoardLayout";
import { answerString, prefilledString } from "./utilities/exampleBoard2";
import NumPad from "./components/NumPad";
import Modal from "./components/Modal";
import { Switch } from "@headlessui/react";
import SudokuButton from "./components/SudokuButton";
import eraser from "./assets/eraser.svg";
import useKeyBoardHandler from "./hooks/useKeyboardHandler";
import keyBoardHandler from "./utilities/keyBoardHandler";
import conflictHandler from "./utilities/conflictHandler";
import eraseCell from "./utilities/eraseCell";
import checkSameNumber from "./utilities/checkSameNumber";
function App() {
  const maxHistorySize = 10;
  const board: SudokuCellAttributes[] = useMemo(
    () => setBoardLayout(answerString, prefilledString),
    []
  );
  const keyMap = useMemo(() => {
    const km = new Map();
    for (let i = 0; i < 9; i++) {
      km.set(`Digit${i + 1}`, i + 1);
    }
    return km;
  }, []);
  const refs = useRef<HTMLDivElement[]>([]);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noteMode, setNoteMode] = useState<boolean>(false);
  const [notes, setNotes] = useState<boolean[][]>(
    Array.from({ length: 81 }, () => Array(9).fill(false))
  );

  const [displayCells, setDisplayCells] = useState<number[]>(
    board.map((cell) => {
      return cell.displayNumber;
    })
  );
  const [currentCell, setCurrentCell] = useState<{
    attributes: SudokuCellAttributes;
    ref: HTMLDivElement;
  }>({
    attributes: board[0],
    ref: refs.current[0],
  });
  const [history, setHistory] = useState<
    {
      displayCells: number[];
      notes: boolean[][];
    }[]
  >([{ displayCells: displayCells, notes: notes }]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const cells = useMemo(
    () =>
      board.map((cell, index) => (
        <SudokuCell
          index={cell.index}
          row={cell.row}
          column={cell.column}
          block={cell.block}
          answer={cell.answer}
          displayNumber={displayCells[index]}
          prefilled={cell.prefilled}
          conflict={
            displayCells[cell.index] != 0
              ? conflictHandler(
                  cell.row,
                  cell.column,
                  cell.block,
                  cell.index,
                  displayCells,
                  board
                )
              : false
          }
          shared={
            displayCells[cell.index] != 0
              ? checkSameNumber(cell.index, displayCells, currentCell)
              : false
          }
          focused={currentCell.attributes.index == cell.index ? true : false}
          size={"16"}
          onClick={() => {
            if (currentCell.attributes.index != cell.index)
              setCurrentCell({
                attributes: {
                  ...cell,
                  displayNumber: displayCells[cell.index],
                },
                ref: refs.current[cell.index],
              });
          }}
          cellRef={(cell: any) => refs.current.push(cell)}
          notes={notes[index]}
          showAnswer={showAnswers}
          key={index}
        />
      )),
    [showAnswers, notes, displayCells, currentCell]
  );

  const keyboardFunction = (event: React.KeyboardEvent) => {
    event.preventDefault();
    keyBoardHandler(
      event,
      currentCell,
      refs.current,
      board,
      displayCells,
      setDisplayCells,
      setCurrentCell,
      noteMode,
      notes,
      setNotes,
      showAnswers,
      keyMap,
      isModalOpen
    );
  };

  const keys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Backspace",
    "w",
    "W",
    "a",
    "A",
    "s",
    "S",
    "d",
    "D",
    ...Array(9)
      .fill("")
      .map((_, i) => `${i + 1}`),
  ];

  function shiftHold(e: KeyboardEvent) {
    if (e.key === "Shift" && !e.repeat) {
      setNoteMode((prev) => !prev);
    }
  }

  useKeyBoardHandler(keys, keyboardFunction);

  useEffect(() => {
    document.addEventListener("keydown", shiftHold);
    document.addEventListener("keyup", shiftHold);

    return () => {
      document.removeEventListener("keydown", shiftHold);
      document.removeEventListener("keyup", shiftHold);
    };
  }, []);

  {
    console.count("counter");
  }

  return (
    <>
      <div className="font-libreFranklin flex items-center flex-col space-y-4">
        <h1 className="text-3xl font-sans">Sudoku React</h1>
        <SudokuButton
          buttonStyle="transition p-2 rounded-xl"
          buttonMouseDown={() => setIsModalOpen(true)}
        >
          How to Play
        </SudokuButton>
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
              <b>clicking on cell the with the mouse pointer</b>, or by
              navigating using the following keys:
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
              <b>Backspace key</b>, or <b>click the eraser button</b>, with a
              cell selected.
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
        <div className="sudoku-board border-black bg-black border-4 ">
          <div className="board-grid">{cells}</div>
        </div>
        <div className="z-0 flex flex-row gap-x-5 filter-none">
          <div className="flex flex-col items-center w-28">
            Note Mode
            <Switch
              checked={noteMode}
              onChange={() => setNoteMode(!noteMode)}
              className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-gray-300 data-checked:bg-blue-600 data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-8" />
            </Switch>
          </div>
          <SudokuButton
            buttonStyle="transition rounded-xl p-3 text-lg"
            bgColor="bg-gray-400"
            bgHover="hover:bg-gray-600"
            bgActive="hover:bg-gray-700"
            textColor="text-gray-300"
            textHover="text-white"
            disabled={true}
            buttonMouseDown={(e: React.MouseEvent) => {}}
          >
            Undo
          </SudokuButton>
          <SudokuButton
            buttonStyle="transition rounded-xl p-3 text-lg"
            bgColor="bg-red-500"
            bgHover="hover:bg-red-600"
            bgActive="hover:bg-red-700"
            textColor="text-white"
            textHover="text-white"
            buttonMouseDown={(e: React.MouseEvent) => {
              eraseCell(
                e,
                currentCell,
                displayCells,
                setDisplayCells,
                notes,
                setNotes
              );
            }}
          >
            <img src={eraser} alt="Clear Cell" />
          </SudokuButton>
          <SudokuButton
            buttonStyle="transition rounded-xl p-3 text-lg"
            bgColor="bg-gray-400"
            bgHover="hover:bg-gray-600"
            bgActive="hover:bg-gray-700"
            textColor="text-gray-300"
            textHover="text-white"
            disabled={true}
            buttonMouseDown={(e: React.MouseEvent) => {}}
          >
            Redo
          </SudokuButton>
          <div className="flex flex-col items-center w-28">
            Show Answers
            <Switch
              checked={showAnswers}
              onChange={() => {
                setShowAnswers(!showAnswers);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-gray-300 data-checked:bg-blue-600 data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-8" />
            </Switch>
          </div>
        </div>
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
          history={history}
          setHistory={setHistory}
          setHistoryIndex={setHistoryIndex}
        />
        <h1 className="pt-3">
          Selected Cell: {currentCell ? currentCell.attributes.index : "none"}{" "}
          Display Number:{" "}
          {currentCell ? currentCell.attributes.displayNumber : "none"}
        </h1>
        <div className="pt-3">
          <SudokuButton
            buttonStyle="p-3 rounded-xl"
            buttonMouseDown={() => {
              setDisplayCells(
                board.map((cell) => {
                  return cell.displayNumber;
                })
              );
              setNotes(Array.from({ length: 81 }, () => Array(9).fill(false)));
            }}
          >
            Reset
          </SudokuButton>
        </div>
      </div>
    </>
  );
}

export default App;
