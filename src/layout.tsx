import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Subtext — understand what happened, remember what mattered",
    template: "%s · Subtext",
  },
  description:
    "Private conversation intelligence. Understand measurable patterns in your conversations, preserve meaningful moments in Afterthought, and find what you thought you had lost with Recall.",
  applicationName: "Subtext",
  authors: [{ name: "Subtext" }],
  robots: { index: false, follow: false },
  openGraph: {
    title: "Subtext — private conversation intelligence",
    description:
      "Understand your conversations, preserve the moments that matter, and find the things you thought you'd forgotten.",
    type: "website",
    siteName: "Subtext",
  },
};

export const viewport: Viewport = {
  themeColor: "#121117",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TooltipProvider delayDuration={250}>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
