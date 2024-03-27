"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";

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
        item="novel"
        id={row.original._id}
        text={row.original.chapterName}
      />
    ),
  },
];
