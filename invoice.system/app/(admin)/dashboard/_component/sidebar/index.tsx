"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_DATA } from "./data/nav-data";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-[#1e2433] text-white p-2 rounded-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
  fixed top-0 left-0 h-screen z-50 w-[220px] bg-[#1e2433] flex flex-col shrink-0
  transition-transform duration-300
  lg:relative lg:translate-x-0 lg:z-auto lg:h-auto
  ${open ? "translate-x-0" : "-translate-x-full"}
`}>
        {/* Logo + close button */}
        <div className="px-5 py-[18px] border-b border-white/10 flex items-center justify-between">
          <span className="text-xl font-semibold text-white">
            OS <span className="text-indigo-500">Accounting</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="py-4 flex-1 overflow-y-auto">
          {NAV_DATA.map((group) => (
            <div key={group.label} className="mb-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 px-5 py-2.5 text-[13px] transition-colors
                      ${isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}