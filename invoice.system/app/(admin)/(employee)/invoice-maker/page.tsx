"use client";
import { useTranslations } from 'next-intl'
import { useState } from "react";
import {
  Eye,
  ChevronDown,
  GripVertical,
  X,
  Plus,
  CalendarIcon,
  File,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

type FormType = {
  contact: string;
  date: Date | null;
  dueDate: Date | null;
  invoiceNo: string;
  reference: string;
  currency: string;
  taxType: string;
};

type LineItem = {
  id: number;
  item: string;
  description: string;
  qty: string;
  unitPrice: string;
  disc: string;
  account: string;
  taxRate: string;
};

type HistoryEntry = {
  id: number;
  prefix: string;
  message: string;
  createdAt: Date;
};

const emptyLine = (id: number): LineItem => ({
  id,
  item: "",
  description: "",
  qty: "",
  unitPrice: "",
  disc: "",
  account: "",
  taxRate: "",
});

export default function InvoicePage() {
  const t = useTranslations("invoice")

  const [lines, setLines] = useState<LineItem[]>(
    Array.from({ length: 5 }, (_, i) => emptyLine(i + 1))
  );
  const [nextId, setNextId] = useState(6);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const [form, setForm] = useState<FormType>({
    contact: "",
    date: null,
    dueDate: null,
    invoiceNo: "INV-000",
    reference: "",
    currency: "RUPEE",
    taxType: "Tax Exclusive",
  });


  const handleSave = () => {
    // Duplicate check
    const isDuplicate = historyEntries.some(
      (entry) => entry.message.startsWith(form.invoiceNo)
    );

    if (isDuplicate) {
      toast.error("This invoice number has already been taken.", {
        duration: 3000,
      });
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const message = `${form.invoiceNo} created successfully`;
    const fullMessage = `On ${dateStr}, ${timeStr}, demo created:`;

    setHistoryEntries((prev) => [
      ...prev,
      { id: Date.now(), message, createdAt: now, prefix: fullMessage },
    ]);

    toast.success("Invoice created successfully", {
      duration: 3000,
    });
  };


  const updateLine = (id: number, field: keyof LineItem, value: string) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const removeLine = (id: number) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const addLine = () => {
    setLines((prev) => [...prev, emptyLine(nextId)]);
    setNextId((n) => n + 1);
  };
  const getTaxRate = (taxRate: string) => {
    if (taxRate === "standard@10%") return 10;
    if (taxRate === "gst@15%") return 15;
    return 0;
  };

  const subtotal = lines.reduce((sum, l) => {
    const qty = parseFloat(l.qty) || 0;
    const price = parseFloat(l.unitPrice) || 0;
    // const disc = parseFloat(l.disc) || 0;
    // return sum + qty * price * (1 - disc / 100);
    return sum + qty * price;
  }, 0);

  const tax = lines.reduce((sum, l) => {
    const qty = parseFloat(l.qty) || 0;
    const price = parseFloat(l.unitPrice) || 0;
    // const disc = parseFloat(l.disc) || 0;
    // const lineAmount = qty * price * (1 - disc / 100);
    const lineAmount = qty * price;
    const taxRate = getTaxRate(l.taxRate);

    if (form.taxType === "Tax Exclusive") {
      return sum + (lineAmount * taxRate) / 100;
    } else {
      return sum + lineAmount - lineAmount / (1 + taxRate / 100);
    }
  }, 0);

  const total = form.taxType === "Tax Exclusive"
    ? subtotal + tax
    : subtotal;

  return (
    <div>
      <div className="rounded-md px-2 md:px-5">
        <div className="bg-gray-100 px-3 md:px-5 py-5">
          {/* Top row - fields */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-3 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 flex-1 w-full">
              <div>
                <label className="text-[11px] text-gray-900 block mb-1">{t("to")}</label>
                <select
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-400"
                >
                  <option value="">{t("select_contact")}</option>
                  <option value="customer">{t("contact_selector.customer")}</option>
                  <option value="vendor">{t("contact_selector.vendor")}</option>
                  <option value="employee">{t("contact_selector.employee")}</option>
                  <option value="other">{t("contact_selector.other")}</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-900 block mb-1">{t("date")}</label>
                <div className="relative">
                  <DatePicker
                    selected={form.date}
                    onChange={(date: Date | null) => setForm((prev) => ({ ...prev, date }))}
                    placeholderText="Select a date"
                    wrapperClassName="w-full"
                    customInput={
                      <input className="w-full bg-gray-50 border border-gray-200 text-black rounded px-2.5 py-1.5 text-xs pr-7" />
                    }
                  />
                  <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none z-10" />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-gray-900 block mb-1">{t("due_date")}</label>
                <div className="relative">
                  <DatePicker
                    selected={form.dueDate}
                    onChange={(date: Date | null) => setForm((prev) => ({ ...prev, dueDate: date }))}
                    placeholderText="Select a date"
                    wrapperClassName="w-full"
                    onChangeRaw={(e) => {
                      const value = (e?.target as HTMLInputElement)?.value;
                      if (!value) return;
                      if (value.startsWith("+")) {
                        const days = parseInt(value.slice(1));
                        if (!isNaN(days) && form.date) {
                          const newDate = new Date(form.date);
                          newDate.setDate(newDate.getDate() + days);
                          setForm((prev) => ({ ...prev, dueDate: newDate }));
                        }
                      }
                    }}
                    customInput={
                      <input className="w-full bg-gray-50 border border-gray-200 text-black rounded px-2.5 py-1.5 text-xs pr-7" />
                    }
                  />
                  <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none z-10" />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-gray-900 block mb-1">{t("invoice_no")}</label>
                <input
                  type="text"
                  value={form.invoiceNo}
                  onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-900 block mb-1">{t("reference")}</label>
                <input
                  type="text"
                  value={form.reference}
                  placeholder={t("enter_reference")}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Preview & Copy */}
            <div className="flex gap-2 shrink-0 self-end lg:self-auto">
              <button className="flex items-center gap-1.5 font-semibold rounded px-3 py-1.5 text-xs text-[#1197D6] hover:bg-gray-50">
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("preview")}</span>
              </button>
              <button className="border border-gray-300 rounded px-4 py-1 text-[#1197D6] hover:bg-gray-50">
                <File className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Currency & Tax row */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="border border-gray-200 rounded px-3 py-1.5 text-xs text-black font-semibold outline-none"
            >
              <option>{t("currency_type.rupee")}</option>
              <option>{t("currency_type.dollar")}</option>
              <option>{t("currency_type.euro")}</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black font-bold">{t("amounts_are")}</span>
              <select
                value={form.taxType}
                onChange={(e) => setForm({ ...form, taxType: e.target.value })}
                className="border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-600 outline-none"
              >
                <option>{t("amount_type.tax_exclusive")}</option>
                <option>{t("amount_type.tax_inclusive")}</option>
              </select>
            </div>
          </div>

          {/* Line items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-200 min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-8 border-r border-gray-200"></th>
                  <th className="text-left py-2 px-2 text-black font-bold w-28 border-r border-gray-200">{t("col_item")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-48 border-r border-gray-200">{t("col_description")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-16 border-r border-gray-200">{t("col_qty")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-24 border-r border-gray-200">{t("col_unit_price")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-20 border-r border-gray-200">{t("col_disc")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-24 border-r border-gray-200">{t("col_account")}</th>
                  <th className="text-left py-2 px-2 text-black font-bold w-20 border-r border-gray-200">{t("col_tax_rate")}</th>
                  <th className="text-right py-2 px-2 text-black font-bold w-24">{t("col_amount")} {form.currency}</th>
                  <th className="w-7"></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => {
                  const qty = parseFloat(line.qty) || 0;
                  const price = parseFloat(line.unitPrice) || 0;
                  const disc = parseFloat(line.disc) || 0;
                  const amount = qty * price * (1 - disc / 100);
                  return (
                    <tr key={line.id} className="border-b border-gray-200 bg-white group">
                      <td className="text-gray-500 cursor-grab px-1 border-r border-gray-200">
                        <GripVertical className="w-3.5 h-3.5" />
                      </td>
                      {(["item", "description", "qty", "unitPrice", "disc", "account", "taxRate"] as const).map((field) => (
                        <td key={field} className="px-1 py-0.5 border-r border-gray-200">
                          {field === "account" ? (
                            <select
                              value={line[field]}
                              onChange={(e) => updateLine(line.id, field, e.target.value)}
                              className="w-full bg-transparent border-none outline-none px-1 py-1 focus:bg-blue-50 rounded text-gray-700 cursor-pointer appearance-none"
                            >
                              <option value=""></option>
                              <option value="accountPayables">{t("account_selector.accountPayables")}</option>
                              <option value="accountReceivables">{t("account_selector.accountReceivables")}</option>
                              <option value="bank">{t("account_selector.bank")}</option>
                              <option value="cash">{t("account_selector.cash")}</option>
                              <option value="costofsales">{t("account_selector.costofsales")}</option>
                              <option value="damageinvertory">{t("account_selector.damageinvertory")}</option>
                              <option value="discountearned">{t("account_selector.discountearned")}</option>
                              <option value="discountgiven">{t("account_selector.discountgiven")}</option>
                              <option value="other">{t("account_selector.other")}</option>
                            </select>
                          ) : field === "taxRate" ? (
                            <select
                              value={line[field]}
                              onChange={(e) => updateLine(line.id, field, e.target.value)}
                              className="w-full bg-transparent border-none outline-none px-1 py-1 focus:bg-blue-50 rounded text-gray-700 cursor-pointer appearance-none"
                            >
                              <option value=""></option>
                              <option value="taxexempt@0%">{t("tax_rate_selector.taxexempt@0%")}</option>
                              <option value="standard@10%">{t("tax_rate_selector.standard@10%")}</option>
                              <option value="gst@15%">{t("tax_rate_selector.gst@15%")}</option>
                            </select>
                          ) : (
                            <input
                              value={line[field]}
                              onChange={(e) => updateLine(line.id, field, e.target.value)}
                              className="w-full max-w-full bg-transparent border-none outline-none px-1 py-1 rounded text-gray-700"
                            />
                          )}
                        </td>
                      ))}
                      <td className="px-2 py-0.5 text-right text-gray-700 border-r border-gray-200">
                        {amount > 0 ? amount.toFixed(2) : ""}
                      </td>
                      <td>
                        <button onClick={() => removeLine(line.id)} className="text-gray-200 hover:text-red-400 px-1">
                          <X className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add line button */}
          <button
            onClick={addLine}
            className="mt-3 flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
          >
            <Plus className="w-3 h-3" />
            {t("add_new_line")}
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Totals */}
          <div className="flex justify-end mt-5">
            <div className="w-full max-w-[260px] space-y-1">
              <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-1">
                <span>{t("subtotal")}</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-1">
                <span>{t("tax")}</span>
                <span>{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2">
                <span>{t("total")}</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex overflow-hidden rounded">
            <button
              onClick={handleSave}
              className="bg-[#1197D6] text-white text-sm px-4 py-2"
            >
              {t("save")}
            </button>
            <button className="bg-[#1197D6] text-white p-1 border-l border-[#42b1e9]">
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex overflow-hidden rounded">
            <button className="bg-[#6bb30d] text-white text-sm px-4 py-2">
              {t("approve")}
            </button>
            <button className="bg-[#6bb30d] text-white p-1 border-l border-[#48db1f]">
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* History */}
        <div className="mt-7">
          <h4 className="text-xs text-gray-900 mb-2">{t("history_notes")}</h4>
          {historyEntries.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-700 mb-1">
                {historyEntries[historyEntries.length - 1].prefix}
              </div>
              <div className="text-xs text-black font-bold mb-2">
                {historyEntries[historyEntries.length - 1].message}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="border border-gray-200 rounded px-3 py-1.5 text-xs text-[#1197D6] font-bold bg-gray-100 hover:bg-gray-50"
                >
                  {showHistory
                    ? t("hide_history")
                    : `Show History (${historyEntries.length} change${historyEntries.length > 1 ? "s" : ""})`}
                </button>
                <button className="border border-gray-200 rounded px-3 py-1.5 text-xs text-[#1197D6] font-bold bg-gray-100 hover:bg-gray-50">
                  {t("add_note")}
                </button>
              </div>
              {showHistory && (
                <div className="mt-2 space-y-2">
                  {historyEntries.map((entry) => (
                    <div key={entry.id} className="text-xs border-l-2 border-gray-200 pl-2">
                      <div className="text-gray-400">{entry.prefix}</div>
                      <div className="text-gray-700 font-medium">{entry.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {historyEntries.length === 0 && (
            <div className="flex">
              <button className="border border-gray-200 rounded px-3 py-1.5 text-xs text-[#1197D6] font-bold bg-gray-100 hover:bg-gray-50">
                {t("add_note")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}