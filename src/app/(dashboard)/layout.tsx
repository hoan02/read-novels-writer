import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { Protect } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import Forbidden403 from "@/components/layouts/Forbidden403";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Sidebar from "@/components/layouts/Sidebar";
import TopBar from "@/components/layouts/TopBar";
import { Separator } from "@/components/ui/separator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Writer Hub",
  description: "Writer dashboard to manage ReadNovels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkVIProvider>
      <html lang="vi">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ToasterProvider />
          <Protect
            permission="org:writer:create"
            // role="org:writer"
            fallback={<Forbidden403 />}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Sidebar />
              <div className="h-full fixed top-0 left-[260px] right-0 bottom-0">
                <TopBar />
                <Separator />
                <div className="h-full w-full scrollbar-thin overflow-y-scroll">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </Protect>
        </body>
      </html>
    </ClerkVIProvider>
  );
}
