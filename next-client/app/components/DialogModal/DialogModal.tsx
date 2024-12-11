import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Portal from "../Portal";

type Props = {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styles?: string;
};

const DialogModal = ({ isOpened, onClose, children, styles = "" }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  return (
    <div
      className={`${
        isOpened ? "visible" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 overflow-y-auto bg-gray-700 opacity-80`}
    >
      <dialog
        ref={ref}
        className={`h-full my-auto sm:h-4/5 p-4 text-gray-700 dark:text-white sm:p-0 w-full sm:w-2/3 bg-white dark:bg-slate-600 rounded-md ${styles}`}
        onCancel={onClose}
      >
        <div className="relative p-4">
          <button
            type="button"
            onClick={() => onClose()}
            className={closeBtnStyle}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
};

const closeBtnStyle = `absolute right-2 top-2 text-sm bg-gray-900 rounded-full p-2 inline-flex items-center justify-center
                       text-white hover:text-gray-200
                       hover:bg-gray-800 focus:outline-none focus:ring-2
                       focus:ring-inset focus:ring-emerald-800`;

export default DialogModal;
