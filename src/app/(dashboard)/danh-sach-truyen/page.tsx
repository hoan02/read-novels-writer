import { DataTable } from "@/components/customUI/DataTable";
import { novelColumns } from "@/components/novel/NovelColumns";
import { getNovels } from "@/lib/data/novel";

const ListNovelPage = async () => {
  const novels = await getNovels();
  return (
    <div className="">
      <p className="">Truyện đã đăng</p>
      <DataTable
        columns={novelColumns}
        data={novels ? novels : []}
        searchKey="novelName"
      />
    </div>
  );
};

export default ListNovelPage;
