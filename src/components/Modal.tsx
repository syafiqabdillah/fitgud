import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ isOpen, toggleOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className={twMerge(
        "fixed bottom-0 top-0 left-0 right-0 bg-gray-400 bg-opacity-70 flex items-center justify-center"
      )}
      onClick={toggleOpen}
    >
      {/* Content */}
      {children}
    </div>
  );
};

export default Modal;
