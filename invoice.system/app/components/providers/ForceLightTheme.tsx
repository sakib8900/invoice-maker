// components/providers/ForceLightTheme.tsx
"use client";

import { useEffect } from "react";

export default function ForceLightTheme() {
  useEffect(() => {
    localStorage.removeItem("theme");
  }, []);

  return null;
}
