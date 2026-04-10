"use client";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { useInvoiceContext } from './InvoiceContext';

export default function HistorySection() {
  const t = useTranslations("invoice");
  const [showHistory, setShowHistory] = useState(false);
  const { historyEntries } = useInvoiceContext();

  return (
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
  );
}