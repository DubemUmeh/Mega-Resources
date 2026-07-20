"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

type ToastVariant = "success" | "error";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastMessage, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() + Math.random() }]);
  }, []);

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4500}>
        {children}

        {toasts.map((t) => {
          const isError = t.variant === "error";
          return (
            <ToastPrimitive.Root
              key={t.id}
              onOpenChange={(open) => {
                if (!open) removeToast(t.id);
              }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-[rgba(10,10,10,0.08)] bg-background p-4 shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-4 data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right-full data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full"
            >
              <div
                className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full ${
                  isError ? "bg-red-500/10" : "bg-blue-600/10"
                }`}
              >
                {isError ? (
                  <FaExclamationCircle className="h-3.5 w-3.5 text-red-400" />
                ) : (
                  <FaCheckCircle className="h-3.5 w-3.5 text-blue-600" />
                )}
              </div>

              <div className="flex-1">
                <ToastPrimitive.Title className="font-display text-[0.92rem] font-semibold text-foreground">
                  {t.title}
                </ToastPrimitive.Title>
                {t.description && (
                  <ToastPrimitive.Description className="mt-0.5 text-[0.82rem] leading-snug text-muted-foreground">
                    {t.description}
                  </ToastPrimitive.Description>
                )}
              </div>

              <ToastPrimitive.Close
                aria-label="Dismiss"
                className="flex-none rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <FaTimes className="h-3 w-3" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}

        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-100 m-0 flex w-full max-w-sm list-none flex-col gap-2.5 p-6 outline-none md:max-w-md" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}