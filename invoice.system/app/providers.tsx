"use client";

import { SidebarProvider } from "./(admin)/dashboard/_component/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/en.json";

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = "en";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}