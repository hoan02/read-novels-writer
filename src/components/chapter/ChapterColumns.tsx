"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import { deleteChapter } from "@/lib/actions/chapter.action";
import toast from "react-hot-toast";

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
    header: "STT",
    cell: ({ row }) => <p>{`${row.original.chapterIndex}`}</p>,
  },
  {
    accessorKey: "chapterName",
    header: "Tên chương",
    cell: ({ row }) => (
      <Link
        href={`/${row.original.novelSlug}/${row.original.chapterIndex}`}
        className="hover:text-red-1"
      >
        {row.original.chapterName}
      </Link>
    ),
  },
  {
    accessorKey: "isPublic",
    header: "Tình trạng",
    cell: ({ row }) => <p>{row.original.isPublic ? "Công khai" : "Ẩn"}</p>,
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
