import type { PropsWithChildren } from "react";
import { Sidebar } from "./dashboard/_component/sidebar";
import { Header } from "./dashboard/_component/header";
import { useTranslations } from "next-intl";
import { Toaster } from "sonner";


export default function AdminLayout({ children }: PropsWithChildren) {
  const t = useTranslations();
  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center" richColors />
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl p-2 md:p-4 flex-1">
          {children}
        </main>
        <footer className="w-full py-3 bg-gray-50">
          <p className="text-center text-[11px] text-black font-semibold">
            {t("footer")}
          </p>
        </footer>
      </div>
    </div>
  );
}