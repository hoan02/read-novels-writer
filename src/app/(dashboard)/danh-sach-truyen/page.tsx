import { DataTable } from "@/components/data-table/DataTable";
import { novelColumns } from "@/components/novel/NovelColumns";
import { getNovels } from "@/lib/data/novel.data";
import { notFound } from "next/navigation";

const ListNovelPage = async () => {
  const res = await getNovels();
  if (!res) {
    notFound();
  }
  const novels = await res.json();

  return (
    <>
      <p className="">Truyện đã đăng</p>
      <DataTable columns={novelColumns} data={novels} searchKey="novelName" />
    </>
  );
};

export default ListNovelPage;
