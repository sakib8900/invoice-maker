import type { PropsWithChildren } from "react";
import { InvoiceProvider } from "./_component/InvoiceContext";

export default function InvoiceLayout({ children }: PropsWithChildren) {
    return (
        <InvoiceProvider>
            {children}
        </InvoiceProvider>
    );
}