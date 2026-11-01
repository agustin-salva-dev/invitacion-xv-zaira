"use client";

import { useEffect, useCallback } from "react";
import type { ModalId } from "@/app/types/invitation";

interface FacadeModalWrapperProps {
  readonly id: ModalId;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly iconSrc?: string;
  readonly children: React.ReactNode;
}

export function FacadeModalWrapper({
  id,
  isOpen,
  onClose,
  title,
  iconSrc,
  children,
}: FacadeModalWrapperProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="facade-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
      onClick={onClose}
    >
      <div
        className="facade-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="facade-modal-content box-color-col degradez-opcional-var">
          {/* Header con icono y botón cerrar */}
          <div className="facade-modal-top">
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Cerrar"
              onClick={onClose}
            >
              &times;
            </button>
            {iconSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="modal-icon"
                src={iconSrc}
                alt=""
                aria-hidden="true"
              />
            )}
          </div>

          <div className="facade-modal-header">
            <h5 id={`modal-title-${id}`} className="modal-title">
              {title}
            </h5>
          </div>

          <div className="facade-modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

