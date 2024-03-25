"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/customUI/DataTable";
import Loader from "@/components/customUI/Loader";
import { Separator } from "@/components/ui/separator";
import { novelColumns } from "@/components/novel/NovelColumns";

const ListNovelPage = () => {
  const [loading, setLoading] = useState(true);
  const [novels, setNovels] = useState([]);

  const getNovels = async () => {
    try {
      const res = await fetch("/api/novels", {
        method: "GET",
      });
      const data = await res.json();
      setNovels(data);
      setLoading(false);
    } catch (err) {
      console.log("[novels_GET]", err);
    }
  };

  useEffect(() => {
    getNovels();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Truyện đã đăng</p>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={novelColumns} data={novels} searchKey="name" />
    </div>
  );
};

export default ListNovelPage;
