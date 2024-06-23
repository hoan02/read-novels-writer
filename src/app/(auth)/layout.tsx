import { Inter } from "next/font/google";

import "../globals.css";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth WriterHub",
  description: "Xác thực quản lý người viết truyện",
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
          className={`${inter.className} min-h-screen w-screen flex items-center`}
        >
          <div className="m-auto py-10">{children}</div>
        </body>
      </html>
    </ClerkVIProvider>
  );
}
