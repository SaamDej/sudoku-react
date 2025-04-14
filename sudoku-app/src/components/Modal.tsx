import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import React, { ReactElement } from "react";
import close from "../assets/close.svg";

import SudokuButton from "./SudokuButton";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactElement;
}
const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const dialogPanelStyle =
    "w-full max-w-md bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]: data-closed:opacity-0";
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 focus:outline-hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="bg-white rounded-3xl px-20 py-6 shadow-md transition duration-300 ease-out data-closed:opacity-0 data-closed:scale-[0.95] max-h-min overflow-y-auto relative"
        >
          <div className="flex flex-row justify-center">
            <DialogTitle
              className={"text-4xl font-bold text-center drop-shadow-md "}
            >
              How to Play Sudoku
            </DialogTitle>{" "}
            <div className="absolute right-4 top-4">
              <SudokuButton
                buttonStyle="transition rounded-lg text-center p-3"
                bgColor="bg-red-500"
                bgHover="hover:bg-red-600"
                bgActive="hover:bg-red-700"
                buttonMouseDown={() => setIsOpen(false)}
              >
                <img src={close} alt="close" />
              </SudokuButton>
            </div>
          </div>
          <div className="max-w-3xl space-y-3">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
