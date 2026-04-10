// app/layout.tsx

import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}