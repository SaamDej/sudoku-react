import { useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SudokuCell, { SudokuCellAttributes } from "./components/SudokuCell";
import SudokuBoard from "./components/SudokuBoard(OLD)";
import setBoardLayout from "./utilities/setBoardLayout";
import exampleBoard, { examplePrefill } from "./utilities/exampleBoard";
import createPrefill from "./utilities/createPrefill";

function App() {
  //console.log("Hello :)");
  const keyMap = new Map();
  for (let i = 0; i < 9; i++) {
    keyMap.set(`Digit${i + 1}`, i + 1);
  }
  //console.log("KeyMap: " + keyMap);
  const cellRef = useRef(0);
  const board: SudokuCellAttributes[] = useMemo(
    () => setBoardLayout(exampleBoard, examplePrefill),
    []
  );
  function shiftHold(e: KeyboardEvent) {
    if (e.key === "Shift" && !e.repeat) {
      setNodeMode((prev) => !prev);
    }
  }
  const [noteMode, setNodeMode] = useState(false);
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
        <h1 className="text-3xl font-sans">Sudoku</h1>
        <SudokuBoard
          cellArray={board}
          focus={() => {}}
          keyPress={(e) => {}}
          cellRefs={0}
          noteMode={noteMode}
          keyMap={keyMap}
        />
        <div className="flex flex-row gap-x-5">
          <button
            className="rounded bg-blue-500 p-3 text-white text-lg hover:bg-blue-700"
            onClick={() => setNodeMode(!noteMode)}
          >
            Toggle Note Mode
          </button>
          <button
            className="rounded bg-blue-500 p-3 text-white text-l  hover:bg-blue-700"
            onMouseDown={(e: React.MouseEvent) => {
              e.preventDefault();
            }}
          >
            Clear Cell
          </button>
        </div>
        <p className="text-xl">Note Mode: {noteMode ? "ON" : "OFF"}</p>
      </div>
      {console.count("counter")}
    </>
  );
}

export default App;
