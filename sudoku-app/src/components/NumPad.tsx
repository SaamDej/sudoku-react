import React from "react";
import NumPadButton from "./NumPadButton";
import { SudokuCellAttributes } from "./SudokuCell";
import updateNotes from "../utilities/updateNotes";
interface NumPadProps {
  currCell: { attributes: SudokuCellAttributes; ref: HTMLDivElement | null };
  displayArray?: number[];
  setDisplay: React.Dispatch<React.SetStateAction<number[]>>;
  notes: boolean[][];
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
  noteMode: boolean;
  board: SudokuCellAttributes[];
  history: {
    displayCells: number[];
    notes: boolean[][];
  }[];
  setHistory: React.Dispatch<
    React.SetStateAction<
      {
        displayCells: number[];
        notes: boolean[][];
      }[]
    >
  >;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
}
const NumPad = ({
  currCell,
  displayArray = [],
  setDisplay,
  notes,
  setNotes,
  noteMode,
  board,
  history,
  setHistory,
  setHistoryIndex,
}: NumPadProps) => {
  const buttonArray = new Array(9).fill(null).map((_, i) => (
    <NumPadButton
      key={`Numpad-${i + 1}`}
      number={i + 1}
      answerCount={5}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        if (currCell && displayArray && !currCell.attributes.prefilled) {
          if (noteMode) {
            if (displayArray[currCell.attributes.index] === 0) {
              const cellNotesArray = notes[currCell.attributes.index].map(
                (note, index) => {
                  if (index === i) {
                    return !note;
                  } else return note;
                }
              );
              const newNotes = notes.map((noteArray, index) => {
                if (index === currCell.attributes.index) {
                  return cellNotesArray;
                } else return noteArray;
              });
              setNotes(newNotes);
              let newHistory = [];
              if (history.length < 10) {
                newHistory = [
                  ...history,
                  { displayCells: displayArray, notes: newNotes },
                ];
              } else {
                newHistory = [
                  ...history.slice(-9),
                  { displayCells: displayArray, notes: newNotes },
                ];
              }
              setHistory(newHistory);
              console.log(newHistory);
            }
          } else {
            const newArray = displayArray.map((value, index) => {
              if (index === currCell.attributes.index) {
                if (value === i + 1) return 0;
                else return i + 1;
              } else return value;
            });
            setDisplay(newArray);
            const newNotes = updateNotes(
              notes,
              //setNotes,
              i + 1,
              currCell.attributes.index,
              displayArray,
              board
            );
            setNotes(newNotes);
            let newHistory = [];
            if (history.length < 10) {
              newHistory = [
                ...history,
                { displayCells: newArray, notes: newNotes },
              ];
            } else {
              newHistory = [
                ...history.slice(-9),
                { displayCells: newArray, notes: newNotes },
              ];
            }
            setHistory(newHistory);
            console.log(newHistory);
          }
        } else {
          console.log("No Cell Selected");
        }
      }}
    />
  ));

  return <div className="flex justify-center gap-2">{buttonArray}</div>;
};

export default NumPad;
