import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { Children, ReactElement, useState } from "react";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactElement;
}
const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const dialogPanelStyle =
    "w-full max-w-md  bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0";
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="relative z-50 bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="bg-white rounded-xl px-20 py-6 shadow-md  h-full overflow-y-auto"
        >
          <DialogTitle
            className={"text-4xl font-bold text-center drop-shadow-md"}
          >
            How to Play Sudoku
          </DialogTitle>
          <div className="max-w-3xl space-y-3">{children}</div>
          <div className="flex justify-center pt-2">
            <button
              className={
                "rounded-xl bg-blue-500 text-white hover:bg-blue-700 text-center p-3"
              }
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
