"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Lock, LockOpen } from "lucide-react";

import { deleteChapter } from "@/lib/actions/chapter.action";
import Delete from "../custom-ui/Delete";
import { Badge } from "../ui/badge";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";

const handleDelete = async (row: any) => {
  try {
    const res = await deleteChapter(row.original._id, row.original.novelSlug);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const columns: ColumnDef<ChapterType>[] = [
  {
    accessorKey: "chapterNumber",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="STT" />
    ),
    cell: ({ row }) => <p>{`${row.original.chapterIndex}`}</p>,
  },
  {
    accessorKey: "chapterName",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Tên chương" />
    ),
    cell: ({ row }) => (
      <div className="lg:w-[400px] truncate font-medium">
        <Link
          href={`/${row.original.novelSlug}/${row.original.chapterIndex}`}
          className="hover:text-red-1 w-[400px]"
        >
          {row.original.chapterName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.state === "đã duyệt"
            ? "default"
            : row.original.state === "chưa duyệt"
            ? "outline"
            : "destructive"
        }
      >
        {row.original.state}
      </Badge>
    ),
  },
  {
    accessorKey: "isPublic",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Công khai" />
    ),
    cell: ({ row }) => <p>{row.original.isPublic ? "Có" : "Không"}</p>,
  },
  {
    accessorKey: "isLock",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Khóa" />
    ),
    cell: ({ row }) => (
      <p>
        {row.original.isLock ? (
          <Lock className="text-red-500" size={20} />
        ) : (
          <LockOpen className="text-green-500" size={20} />
        )}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Delete
        text={row.original.chapterName}
        onDelete={() => handleDelete(row)}
      />
    ),
  },
];
