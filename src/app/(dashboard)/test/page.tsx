"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import {
  Menu,
  LibrarySquare,
  PlusCircle,
  PieChart,
  Bug,
  Flag,
  MessageCircleQuestion,
  FileWarning,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/customUI/ModeToggle";

type MenuNav = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const menuNav: MenuNav[] = [
  {
    href: "/them-truyen",
    label: "Thêm mới",
    icon: PlusCircle,
  },
  {
    href: "/danh-sach-truyen",
    label: "Đã đăng",
    icon: LibrarySquare,
  },
  {
    href: "/thong-ke",
    label: "Thống kê",
    icon: PieChart,
  },
  {
    href: "/xu-ly-bao-cao",
    label: "Xử lý báo cáo",
    icon: Flag,
  },
  {
    href: "/yeu-cau-ho-tro",
    label: "Yêu cầu hỗ trợ",
    icon: FileWarning,
  },
  {
    href: "/kien-thuc-co-ban",
    label: "Kiến thức cơ bản",
    icon: MessageCircleQuestion,
  },
  {
    href: "/bao-loi",
    label: "Báo lỗi",
    icon: Bug,
  },
];

export default function Test() {
  const currentPath = usePathname();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-4 font-semibold">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <span className="text-2xl text-primary">WriterHub</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-base font-medium lg:px-4">
              {menuNav.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      currentPath === item.href ? "bg-muted text-primary" : ""
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="ml-2">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4">Bottom</div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {menuNav.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      href={item.href}
                      key={item.label}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                        currentPath === item.href ? "bg-muted text-primary" : ""
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto">Bottom</div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <ModeToggle />
          </div>
          <UserButton />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 scrollbar-thin">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
