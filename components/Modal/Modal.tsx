"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
// "use client";

// import { useEffect } from "react";
// import { createPortal } from "react-dom";

// import css from "./Modal.module.css";

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }

// export default function Modal({ onClose, children }: ModalProps) {
//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClick}
//     >
//       <div className={css.modal}>{children}</div>
//     </div>,
//     document.getElementById("modal-root") as HTMLDivElement
//   );
// }
