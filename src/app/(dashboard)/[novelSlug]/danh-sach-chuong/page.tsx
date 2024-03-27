import { columns } from "@/components/chapter/ChapterColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { getChapters } from "@/lib/data/chapter.data";
import { useParams } from "next/navigation";

const ListChapter = async ({ params }: { params: { novelSlug: string } }) => {
  const res = await getChapters(params.novelSlug);
  const chapters = await res.json();

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Danh sách chương</p>
      </div>
      <DataTable columns={columns} data={chapters} searchKey="name" />
    </div>
  );
};

export default ListChapter;
