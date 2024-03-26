import { DataTable } from "@/components/data-table/DataTable";
import { novelColumns } from "@/components/novel/NovelColumns";
import { getNovels } from "@/lib/data/novel";

const ListNovelPage = async () => {
  const novels = await getNovels();
  return (
    <div className="">
      <p className="">Truyện đã đăng</p>
      <DataTable
        columns={novelColumns}
        data={novels}
        searchKey="novelName"
      />
    </div>
  );
};

export default ListNovelPage;
