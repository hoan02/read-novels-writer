import Link from "next/link";
import { Home } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const TopBar = () => {
  return (
    <div className="h-[60px] w-full p-4 flex justify-between items-center">
      <Link
        href="/"
        className="flex gap-1 cursor-pointer hover:text-gray-300 items-center"
      >
        <Home />
        <div className="text-sm">Trở về trang chủ</div>
      </Link>
      <UserButton showName={true} />
    </div>
  );
};

export default TopBar;
