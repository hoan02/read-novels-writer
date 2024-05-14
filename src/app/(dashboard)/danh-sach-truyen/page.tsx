import Link from "next/link";
import { notFound } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { novelColumns } from "@/components/novel/NovelColumns";
import { getNovels } from "@/lib/data/novel.data";

const ListNovelPage = async () => {
  const { data: novels, message, status } = await getNovels();
  if (status === 404) notFound();
  if (status === 500) {
    return <>{message}</>;
  }
  if (status === 200) {
    return (
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Danh sách truyện</p>
          <Link href={`/them-truyen`}>
            <Button className="flex gap-2 items-center">
              <PlusCircle size={20} /> Thêm truyện mới
            </Button>
          </Link>
        </div>
        <DataTable columns={novelColumns} data={novels} searchKey="novelName" />
      </div>
    );
  }
};

export default ListNovelPage;

export const dynamic = "force-dynamic";
