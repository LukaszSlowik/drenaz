import React from "react";
import { createPortal } from "react-dom";
type Props = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onReset: () => void;
};

const ModalResetCount = ({ open, onReset, children, onClose }: Props) => {
  if (!open) return null;
  return createPortal(
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-slate-900/90 z-20">
        <div className="fixed left-1/2 top-1/2 z-10  w-5/6 max-w-sm -translate-x-2/4 -translate-y-2/4 rounded-md bg-white px-10 py-6 shadow-md">
          <div className="mx-6 text-xl font-semibold sm:my-4 sm:text-2xl ">
            {children}
          </div>
          <div className="flex flex-row-reverse gap-4">
            <button
              onClick={onReset}
              className="mt-8  rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Tak
            </button>
            <button
              onClick={onClose}
              className="mt-8  rounded-md bg-white px-4 py-2 text-green-600 hover:bg-green-700 outline"
            >
              Nie
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ModalResetCount;
