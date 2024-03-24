"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LibrarySquare,
  PlusCircle,
  PieChart,
  Bug,
  Flag,
  MessageCircleQuestion,
  FileWarning,
} from "lucide-react";
import { ModeToggle } from "../customUI/ModeToggle";

type ItemType = {
  href: string;
  label: string;
  icon: JSX.Element;
};

interface CustomListProps {
  label: string;
  items: ItemType[];
}

const menuItems: ItemType[] = [
  {
    href: "/them-truyen",
    label: "Thêm mới",
    icon: <PlusCircle />,
  },
  {
    href: "/danh-sach-truyen",
    label: "Đã đăng",
    icon: <LibrarySquare />,
  },
  {
    href: "/thong-ke",
    label: "Thống kê",
    icon: <PieChart />,
  },
  {
    href: "/xu-ly-bao-cao",
    label: "Xử lý báo cáo",
    icon: <Flag />,
  },
  {
    href: "/yeu-cau-ho-tro",
    label: "Yêu cầu hỗ trợ",
    icon: <FileWarning />,
  },
  {
    href: "/kien-thuc-co-ban",
    label: "Kiến thức cơ bản",
    icon: <MessageCircleQuestion />,
  },
  {
    href: "/bao-loi",
    label: "Báo lỗi",
    icon: <Bug />,
  },
];

const Sidebar = () => {
  return (
    <div className="w-[260px] h-full fixed border-r-2 flex flex-col p-4">
      <div className="h-[60px]">Logo</div>
      <div className="grow">
        <CustomList label="TRUYỆN CỦA TÔI" items={menuItems.slice(0, 3)} />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

const CustomList = ({ label, items }: CustomListProps) => {
  const currentPath = usePathname();
  return (
    <div>
      <p className="my-2 ml-2 font-semibold text-sm opacity-60">{label}</p>
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`p-2 mx-2 flex items-center gap-2 rounded hover:bg-gray-300 ${
            currentPath === item.href ? "bg-yellow-500" : ""
          }`}
        >
          {item.icon}
          <span className="ml-2">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
