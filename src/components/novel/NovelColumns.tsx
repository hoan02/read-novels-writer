"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUI/Delete";
import { AreaChart, FilePenLine, Link2, List, PlusCircle } from "lucide-react";

export const novelColumns: ColumnDef<NovelType>[] = [
  {
    accessorKey: "name",
    header: "Tên truyện",
    cell: ({ row }) => <p>{row.original.novelName}</p>,
  },
  {
    accessorKey: "chapters",
    header: "Số chương",
    cell: ({ row }) => <p>{row.original.chapterCount}</p>,
  },
  {
    id: "addChapter",
    cell: ({ row }) => (
      <Link
        href={`/${row.original.novelSlug}/them-chuong`}
        title="Thêm chương mới"
      >
        <PlusCircle />
      </Link>
    ),
  },
  {
    id: "list-chapter",
    cell: ({ row }) => (
      <Link href={`/novels/${row.original._id}/list-chapter`} title="Danh sách chương">
        <List />
      </Link>
    ),
  },

  {
    id: "edit",
    cell: ({ row }) => (
      <Link href={`/novels/${row.original._id}`} title="Chỉnh sửa truyện">
        <FilePenLine />
      </Link>
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Delete item="novel" id={row.original._id} text={row.original.novelName} />
    ),
  },
  {
    id: "statistic",
    cell: ({ row }) => (
      <Link href={`/novels/${row.original._id}/statistics`} title="Thống kê">
        <AreaChart />
      </Link>
    ),
  },
  {
    id: "link",
    cell: ({ row }) => (
      <Link href={`${process.env.URL_READER}/truyen/${row.original.novelSlug}`} title="Link tới truyện">
        <Link2 />
      </Link>
    ),
  },
];
