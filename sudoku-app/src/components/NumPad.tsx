import React from "react";
import NumPadButton from "./NumPadButton";
import { SudokuCellAttributes } from "./SudokuCell";
import updateNotes from "../utilities/updateNotes";
interface NumPadProps {
  currCell: { attributes: SudokuCellAttributes; ref: HTMLDivElement } | null;
  displayArray?: number[];
  setDisplay: React.Dispatch<React.SetStateAction<number[]>>;
  notes: boolean[][];
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
  noteMode: boolean;
  board: SudokuCellAttributes[];
}
const NumPad = ({
  currCell,
  displayArray = [],
  setDisplay,
  notes,
  setNotes,
  noteMode,
  board,
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
            }
          } else {
            const newArray = displayArray.map((value, index) => {
              if (index === currCell.attributes.index) {
                if (value === i + 1) return 0;
                else return i + 1;
              } else return value;
            });
            setDisplay(newArray);
            updateNotes(
              notes,
              setNotes,
              i + 1,
              currCell.attributes.index,
              board[currCell.attributes.index].row,
              board[currCell.attributes.index].column,
              board[currCell.attributes.index].block,
              displayArray,
              board
            );
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
