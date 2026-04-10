"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { HistoryEntry, InvoiceContextType } from "../types/invoiceType";

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  const addHistoryEntry = (entry: HistoryEntry) => {
    setHistoryEntries((prev) => [...prev, entry]);
  };

  return (
    <InvoiceContext.Provider value={{ historyEntries, addHistoryEntry }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoiceContext() {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoiceContext must be used within InvoiceProvider");
  return context;
}