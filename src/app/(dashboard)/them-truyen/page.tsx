import NovelSubmissionGuidelines from "@/components/novel/NovelSubmissionGuidelines";
import NovelForm from "@/components/novel/NovelForm";

const CreateNovel = () => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //   <div className="col-span-1 md:col-span-1">
    //     <NovelForm />
    //   </div>
    //   <div className="col-span-1 md:col-span-1">
    //     <NovelSubmissionGuidelines />
    //   </div>
    // </div>
    <div>
      <NovelForm />
    </div>
  );
};

export default CreateNovel;
