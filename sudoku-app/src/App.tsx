import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Switch } from "@headlessui/react";
import useKeyBoardHandler from "./hooks/useKeyboardHandler";
import {
  SudokuCell,
  NumPad,
  SudokuButton,
  TimeTracker,
  CustomSVG,
  SVG,
} from "./components";
import {
  keyBoardHandler,
  conflictHandler,
  checkSameNumber,
  KEYS,
  KEY_MAP,
  BOARD,
  createNotes,
  updateNotes,
  checkEmpty,
  createNewDisplayCells,
  createNewNotes,
} from "./utilities";
import { CellNotes, SudokuCellAttributes } from "./types";

const initializeNotes = createNotes(BOARD);
const initializeDisplay = BOARD.map((cell) => {
  return cell.displayNumber;
});
function App() {
  const [showAnswers, setShowAnswers] = useState<boolean>(false); // Show or hide the answers
  const [isPaused, setIsPaused] = useState<boolean>(false); // Timer paused state
  const [noteMode, setNoteMode] = useState<boolean>(false); // Determine if player input is in note mode or not
  const [notes, setNotes] = useState<CellNotes[]>(initializeNotes); // Notes for each cell, 81 cells with 9 notes each
  const [displayCells, setDisplayCells] = useState<number[]>(initializeDisplay); // Array of each cell's displayed number whether prefilled, user filled, or empty.
  const [currentCell, setCurrentCell] = useState<number>(0);
  const [time, setTime] = useState("00:00");
  //const [isModalOpen, setIsModalOpen] = useState<string | null>(null); // Modal state, can be "tutorial", "timer", or null
  const cellOnClick = useCallback((index: number) => {
    setCurrentCell(index);
  }, []);

  const stopwatchHandler = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);
  const getTime = useCallback((time: string) => setTime(time), []);
  const numPadHandler = useCallback(
    (i: number) => {
      if (!displayCells || BOARD[currentCell].prefilled) {
        return;
      }
      if (
        noteMode &&
        notes &&
        notes[currentCell] &&
        displayCells[currentCell] === 0
      ) {
        setNotes((prev) => createNewNotes(currentCell, i, prev));
      } else if (!noteMode) {
        setDisplayCells((prev) =>
          createNewDisplayCells(prev, currentCell, i + 1)
        );
        setNotes((prev) =>
          updateNotes(prev, i + 1, currentCell, displayCells, BOARD)
        );
      }
    },
    [displayCells, currentCell, notes, noteMode]
  );

  const eraseHandler = useCallback(() => {
    if (BOARD[currentCell].prefilled) return;
    if (displayCells[currentCell] !== 0) {
      setDisplayCells((prev) => createNewDisplayCells(prev, currentCell, 0));
      return;
    }
    if (notes[currentCell] && !checkEmpty(notes[currentCell])) {
      const clearedArray = Array(9).fill(false);
      const newNotes = notes.map((noteArray, index) =>
        index === currentCell ? clearedArray : noteArray
      );
      setNotes(newNotes);
    }
  }, [currentCell, displayCells, notes]);

  const handleConflict = useCallback(
    (cell: SudokuCellAttributes) => {
      return displayCells[cell.index] != 0
        ? conflictHandler(
            cell.row,
            cell.column,
            cell.block,
            cell.index,
            displayCells,
            BOARD
          )
        : false;
    },
    [displayCells]
  );
  const handleShared = useCallback(
    (index: number) => {
      return displayCells[index] != 0
        ? checkSameNumber(index, displayCells, currentCell)
        : false;
    },
    [displayCells, currentCell]
  );

  const cells = useMemo(
    () =>
      BOARD.map((cell, index) => (
        <SudokuCell
          index={cell.index}
          row={cell.row}
          column={cell.column}
          block={cell.block}
          answer={cell.answer}
          displayNumber={displayCells[index]}
          prefilled={cell.prefilled}
          conflict={handleConflict(cell)}
          shared={handleShared(index)}
          focused={currentCell === index}
          size={"cell-size"}
          onClick={cellOnClick}
          notes={notes[index]}
          showAnswer={showAnswers}
          key={index}
        />
      )),
    [
      displayCells,
      currentCell,
      notes,
      cellOnClick,
      showAnswers,
      handleShared,
      handleConflict,
    ]
  );

  const keyboardFunction = (event: React.KeyboardEvent) => {
    event.preventDefault();
    keyBoardHandler(
      event,
      currentCell,
      BOARD,
      displayCells,
      setDisplayCells,
      setCurrentCell,
      noteMode,
      notes,
      setNotes,
      KEY_MAP,
      isPaused
    );
  };
  /** Updates noteMode state whenever shift is held down or released. */
  function shiftHold(e: KeyboardEvent) {
    if (e.key === "Shift" && !e.repeat) {
      setNoteMode((prev) => !prev);
    }
  }
  const resetBoard = useCallback(() => {
    setDisplayCells(
      BOARD.map((cell) => {
        return cell.displayNumber;
      })
    );
    setNotes(createNotes(BOARD));
  }, []);

  /** Passes KEYS array and keyboardFunction function to custom hook */
  useKeyBoardHandler(KEYS, keyboardFunction);

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
    //console.log(refs.current.length);
  }

  return (
    <>
      {/* --App Wrapper-- */}
      <div className="min-w-0 inter flex flex-col items-center ">
        {/* --Header-- */}
        <header className="header w-full pb-1 sticky top-0  bg-sdk-blue-600 border-b-2 z-20 border-b-sdk-blue-900">
          <h1 className="text-xl/8 sm:text-2xl text-center text-sdk-neutral-100 font-libre-franklin font-semibold ">
            Sudoku React
          </h1>
        </header>
        {/* --Container for everything below the header-- */}
        <div className="flex flex-col items-stretch">
          {/* --Above Board UI  Wrapper-- */}
          <div className="above-board flex pt-5 flex-row justify-center items-center">
            <span className="flex-grow-1 basis-0 flex justify-start text-xl lg:text-2xl">
              Easy
            </span>
            <TimeTracker
              isPaused={isPaused}
              onClick={stopwatchHandler}
              getTime={getTime}
            />
            {/* --Settings button wrapper-- */}
            <div className="flex-grow-1 basis-0 flex justify-end">
              <SudokuButton
                buttonStyle="group transition rounded-sm p-[6px] size-10 justify-center"
                bgColorStyle="bg-sdk-neutral-500"
                bgHoverStyle="hover:bg-sdk-neutral-300"
                bgActiveStyle="active:bg-sdk-neutral-600"
              >
                <div className="flex items-center justify-center">
                  <CustomSVG className="fill-sdk-neutral-100 lg:size-[28px] transition-all group-active:scale-125">
                    <SVG.Settings />
                  </CustomSVG>
                </div>
              </SudokuButton>
            </div>
          </div>
          {/* --The Board and everything else below it-- */}
          <div className="pt-4 space-y-2 flex flex-col justify-items-center lg:space-x-4 lg:flex-row">
            {/* --Board wrapper --*/}
            <div className="flex flex-row items-center justify-center max-w-4xl sudoku-board self-center border-black bg-black border-3">
              {/* --Div that disables board on pause-- */}
              <div
                className={`h-fit transition w-min ease-in absolute z-20 bg-black ${!isPaused ? "opacity-0 pointer-events-none" : "opacity-25 pointer-events-auto"}`}
              />
              {/*--Grid-- */}
              <div className="grid justify-center w-min m grid-cols-[repeat(9,1fr)] [&>*:nth-child(3n):not(:nth-child(9n))]:mr-0.75 [&>*:nth-child(19)]:mb-0.75 [&>*:nth-child(46)]:mb-0.75">
                {cells}
              </div>
            </div>
            {/* --Below the board wrapper-- */}
            <div className="lower flex flex-col">
              {/* --Abover NumPad-- */}
              <div className="below-board z-0 flex flex-row filter-none space-x-2 pb-5">
                {/* --Note Mode Toggle Wrapper-- */}
                <div className=" text-sm flex flex-col basis-0 flex-grow-1 w-min justify-center items-center">
                  Note Mode
                  <Switch
                    checked={noteMode}
                    onChange={setNoteMode}
                    className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-sdk-neutral-300 data-checked:bg-sdk-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50"
                  >
                    <span className="size-5 translate-x-1 rounded-full bg-sdk-neutral-100 transition group-data-checked:translate-x-8" />
                  </Switch>
                </div>
                <SudokuButton
                  buttonStyle="group transition lg:flex justify-center items-center size-18 rounded-lg p-3 text-lg hidden"
                  bgColorStyle="bg-sdk-red-500"
                  bgHoverStyle="hover:bg-sdk-red-400"
                  bgActiveStyle="active:bg-sdk-red-600"
                  textColorStyle="text-sdk-neutral-100"
                  textHoverStyle="text-sdk-neutral-100"
                  disabled={false}
                  onClick={eraseHandler}
                >
                  <CustomSVG className="size-6 lg:size-8 transition-all /group-active:scale-125">
                    <SVG.Eraser />
                  </CustomSVG>
                </SudokuButton>
                {/* --Show answers toggle wrapper-- */}
                <div className="flex flex-col basis-0 text-sm flex-grow-1 w-min justify-center items-center">
                  Show Answers
                  <Switch
                    checked={showAnswers}
                    onChange={setShowAnswers}
                    className=" transition-colors group inline-flex h-7 w-14 items-center rounded-full bg-sdk-neutral-300 data-checked:bg-sdk-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50"
                  >
                    <span className="size-5 translate-x-1 rounded-full bg-sdk-neutral-100 transition group-data-checked:translate-x-8" />
                  </Switch>
                </div>
              </div>
              {/* --NumPad and below-- */}
              <div className="flex flex-col /lg:w-min">
                <NumPad
                  disabled={false}
                  onClick={numPadHandler}
                  eraseHandler={eraseHandler}
                />
                <h1>{time}</h1>
                {/* <h1 className="pt-3">
                  Selected Cell: {currentCell}{" "}
                  <br className="hidden lg:inline" /> Display Number:{" "}
                  {displayCells[currentCell] === 0
                    ? "none"
                    : displayCells[currentCell]}
                </h1> */}
                {/* --Below Numpad Buttons-- */}
                {/* <div className=" flex flex-row justify-center space-x-2 pt-3">
                  <SudokuButton
                    buttonStyle="transition p-2 w-28 rounded-xl"
                    //onClick={() => {}}
                  >
                    How to Play
                  </SudokuButton>
                  <SudokuButton
                    buttonStyle="transition p-2 w-28 rounded-xl"
                    onClick={resetBoard}
                  >
                    Reset
                  </SudokuButton>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
