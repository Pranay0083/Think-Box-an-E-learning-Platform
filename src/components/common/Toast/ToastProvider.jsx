import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import "./toast.css";

const ToastContext = createContext(null);

function randomId() {
  return Math.random().toString(16).slice(2);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) window.clearTimeout(timer);
    timersRef.current.delete(id);
  }, []);

  const pushToast = useCallback(
    ({ type, message, duration = 3500 }) => {
      const id = randomId();
      setToasts((prev) => [
        ...prev,
        {
          id,
          type,
          message,
        },
      ]);

      const timer = window.setTimeout(() => removeToast(id), duration);
      timersRef.current.set(id, timer);
      return id;
    },
    [removeToast]
  );

  const api = useMemo(
    () => ({
      toast: {
        success: (message, opts) => pushToast({ type: "success", message, ...(opts ?? {}) }),
        error: (message, opts) => pushToast({ type: "error", message, ...(opts ?? {}) }),
        info: (message, opts) => pushToast({ type: "info", message, ...(opts ?? {}) }),
      },
      removeToast,
    }),
    [pushToast, removeToast]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-container" aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <div className="toast-message">{t.message}</div>
            <button
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={() => removeToast(t.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

