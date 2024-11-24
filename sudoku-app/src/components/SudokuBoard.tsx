import React, { ReactNode } from "react";

interface SudokuBoardProps {
  children: ReactNode;
}

const SudokuBoard = ({ children }: SudokuBoardProps) => {
  return (
    <div className="sudoku-board border-black bg-black border-4 ">
      <div className="board-grid">{children}</div>
    </div>
  );
};

export default SudokuBoard;