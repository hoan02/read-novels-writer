"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  AreaChart,
  FilePenLine,
  Link2,
  List,
  PlusCircle,
  Ellipsis,
} from "lucide-react";
import { Button } from "../ui/button";
import Delete from "../custom-ui/Delete";
import { DataTableColumnHeader } from "../data-table/DataTableColumHeader";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const novelColumns: ColumnDef<NovelType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "novelName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên truyện" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">
        {row.original.novelName}
      </div>
    ),
  },
  {
    accessorKey: "chapterCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số chương
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[50px]">{row.original.chapterCount}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] p-2">
          <DropdownMenuItem>
            <Link
              href={`/${row.original.novelSlug}/them-chuong`}
              className="flex gap-4 items-center"
            >
              <PlusCircle size={20} /> Thêm chương mới
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${row.original.novelSlug}}/danh-sach-chuong`}
              className="flex gap-4 items-center"
            >
              <List size={20} /> Danh sách chương
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${row.original.novelSlug}`}
              className="flex gap-4 items-center"
            >
              <FilePenLine size={20} /> Chỉnh sửa truyện
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${row.original.novelSlug}/thong-ke`}
              className="flex gap-4 items-center"
            >
              <AreaChart size={20} /> Thống kê
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`${process.env.NEXT_PUBLIC_READER_URL}truyen/${row.original.novelSlug}`}
              className="flex gap-4 items-center"
            >
              <Link2 size={20} /> Đọc truyện
            </Link>
          </DropdownMenuItem>
          <div className="px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-800 rounded">
            <Delete
              item="novel"
              id={row.original._id}
              text={row.original.novelName}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
