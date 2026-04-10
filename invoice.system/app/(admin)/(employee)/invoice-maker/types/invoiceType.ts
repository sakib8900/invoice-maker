export type FormType = {
  contact: string;
  date: Date | null;
  dueDate: Date | null;
  invoiceNo: string;
  reference: string;
  currency: string;
  taxType: string;
};

export type LineItem = {
  id: number;
  item: string;
  description: string;
  qty: string;
  unitPrice: string;
  disc: string;
  account: string;
  taxRate: string;
};

export type HistoryEntry = {
  id: number;
  prefix: string;
  message: string;
  createdAt: Date;
};

export type InvoiceContextType = {
  historyEntries: HistoryEntry[];
  addHistoryEntry: (entry: HistoryEntry) => void;
};