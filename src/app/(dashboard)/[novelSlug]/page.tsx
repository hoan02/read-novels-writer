import NovelForm from "@/components/novel/NovelForm";
import { getNovel } from "@/lib/data/novel.data";
import { notFound } from "next/navigation";

const NovelDetailsPage = async ({
  params,
}: {
  params: { novelSlug: string };
}) => {
  const res = await getNovel(params.novelSlug);
  if (res.status === 404) {
    notFound();
  }
  const novel = await res.json();

  return <NovelForm initialData={novel ? novel : []} />;
};

export default NovelDetailsPage;
