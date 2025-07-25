import React from "react";
import { CellNotes } from "../types";

const createNewNotes = (currentCell: number, i: number, notes: CellNotes[]) => {
  if (!notes[currentCell]) return notes;
  const cellNotesArray = notes[currentCell].map((note, index) => {
    if (index === i) return !note;
    else return note;
  });
  const newNotes = notes.map((noteArray, index) => {
    if (index === currentCell) return cellNotesArray;
    else return noteArray;
  });
  return newNotes;
};

export default createNewNotes;
