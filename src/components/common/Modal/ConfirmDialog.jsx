import React, { useEffect, useRef } from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default", // "default" | "danger"
  confirmDisabled = false,
  onConfirm,
  onClose,
}) => {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    // Focus for keyboard users.
    const t = window.setTimeout(() => confirmBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="confirmDialogOverlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        // Close only when clicking the backdrop.
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={`confirmDialog ${variant === "danger" ? "confirmDialog-danger" : ""}`}>
        <div className="confirmDialog-header">
          <h2 className="confirmDialog-title">{title}</h2>
        </div>
        <div className="confirmDialog-body">{message}</div>

        <div className="confirmDialog-actions">
          <button
            ref={confirmBtnRef}
            type="button"
            className={`confirmDialog-confirm ${variant === "danger" ? "danger" : "primary"}`}
            onClick={() => onConfirm?.()}
            disabled={confirmDisabled}
          >
            {confirmText}
          </button>
          <button type="button" className="confirmDialog-cancel" onClick={() => onClose?.()}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

