import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Protect } from "@clerk/nextjs";

import "@/styles/globals.css";
import Forbidden403 from "@/components/layouts/Forbidden403";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Sidebar from "@/components/layouts/Sidebar";
import TopBar from "@/components/layouts/TopBar";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
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
              <div className="h-full fixed top-0 left-[260px]">
                <TopBar />
                <div className="h-full scrollbar-thin overflow-y-scroll">
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
