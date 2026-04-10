"use client";
import {
  ArrowRight,
  ArrowLeft,
  UserIcon,
  Maximize,
} from "lucide-react";

export function Header() {
  return (
    <header className="h-13 bg-gray-50 flex items-center px-5 gap-4">
      {/* Breadcrumb */}
      <div className="flex font-semibold items-center gap-1.5 text-sm text-black flex-1">
        <span><ArrowLeft className="w-3.5 h-3.5 hover:text-gray-500" /></span>
        <span><ArrowRight className="w-3.5 h-3.5 hover:text-gray-500" /></span>
        <span>admin</span>
        <span>/</span>
        <span>invoice-maker</span>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2.5">
        <button className="w-8 h-8 text-black">
          <Maximize className="w-5 h-5 hover:text-gray-500" />
        </button>
        <button className="w-8 h-8 text-black">
          <UserIcon className="w-5 h-5 hover:text-gray-500" />
        </button>
      </div>
    </header>
  );
}