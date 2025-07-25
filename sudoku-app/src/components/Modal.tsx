import {
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
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
  diologStyle?: string;
  backdropStyle?: string;
  panelWrapperStyle?: string;
  panelStyle?: string;
  titleWrapperStyle?: string;
  title?: string;
  titleStyle?: string;
  childrenWrapperStyle?: string;
  children?: ReactElement;
}
const Modal = ({
  isOpen,
  setIsOpen,
  diologStyle = "relative z-50 focus:outline-hidden",
  backdropStyle = "fixed inset-0 bg-black/30 transition duration-300 ease-out data-closed:opacity-0",
  panelWrapperStyle = "fixed inset-0 flex w-screen items-center justify-center p-4",
  panelStyle = "bg-white rounded-3xl px-20 py-6 shadow-md transition duration-300 ease-out data-closed:opacity-0 data-closed:scale-[0.95] max-h-min overflow-y-auto relative",
  titleWrapperStyle = "flex flex-row justify-center",
  title = "",
  titleStyle = "text-4xl font-bold text-center drop-shadow-md",
  childrenWrapperStyle = "max-w-3xl space-y-3",
  children,
}: ModalProps) => {
  const dialogPanelStyle =
    "w-full max-w-md bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]: data-closed:opacity-0";
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(null);
      }}
      className={diologStyle}
    >
      <DialogBackdrop transition className={backdropStyle} />
      <div className={panelWrapperStyle}>
        <DialogPanel transition className={panelStyle}>
          <div className={titleWrapperStyle}>
            <DialogTitle className={titleStyle}>{title}</DialogTitle>{" "}
            <div className="absolute right-4 top-4">
              <SudokuButton
                buttonStyle="transition rounded-lg text-center p-3"
                bgColorStyle="bg-red-500"
                bgHoverStyle="hover:bg-red-600"
                bgActiveStyle="hover:bg-red-700"
                onClick={() => {
                  setIsOpen(null);
                }}
              >
                <img src={close} alt="close" />
              </SudokuButton>
            </div>
          </div>
          <div className={childrenWrapperStyle}>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
