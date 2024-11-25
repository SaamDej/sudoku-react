import React from "react";
import NumPadButton from "./NumPadButton";
import { SudokuCellAttributes } from "./SudokuCell";
interface NumPadProps {
  currCell: SudokuCellAttributes | null;
  displayArray?: number[];
  setDisplay: React.Dispatch<React.SetStateAction<number[]>>;
  notes: boolean[][];
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
  noteMode: boolean;
}
const NumPad = ({
  currCell,
  displayArray = [],
  setDisplay,
  notes,
  setNotes,
  noteMode,
}: NumPadProps) => {
  const buttonArray = new Array(9).fill(null).map((_, i) => (
    <NumPadButton
      key={`Numpad-${i + 1}`}
      number={i + 1}
      answerCount={5}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        if (currCell && displayArray && !currCell.prefilled) {
          if (noteMode) {
            if (displayArray[currCell.index] === 0) {
              const cellNotesArray = notes[currCell.index].map(
                (note, index) => {
                  if (index === i) {
                    return !note;
                  } else return note;
                }
              );
              const newNotes = notes.map((noteArray, index) => {
                if (index === currCell.index) {
                  return cellNotesArray;
                } else return noteArray;
              });
              setNotes(newNotes);
            }
          } else {
            const newArray = displayArray.map((value, index) => {
              if (index === currCell.index) {
                if (value === i + 1) return 0;
                else return i + 1;
              } else return value;
            });
            setDisplay(newArray);
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
