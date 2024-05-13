"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import "react-quill/dist/quill.snow.css";
import TextEditor from "../custom-ui/TextEditor";
import { updateChapter } from "@/lib/actions/chapter.action";

const formSchema = z.object({
  chapterName: z.string().min(2).max(150),
  content: z.string().min(1).trim(),
});

interface EditChapterFormProps {
  dataNovel?: NovelType | null;
  dataChapter?: ChapterType | null;
}

const EditChapterForm: React.FC<EditChapterFormProps> = ({
  dataChapter,
  dataNovel,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dataChapter || {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = dataChapter?._id;
      const params = { ...values };
      const toastId = toast.loading("Loading...");
      if (id) {
        const res = await updateChapter(id, params);
        toast.dismiss(toastId);
        if (res.success) {
          toast.success(res.message);
          setTimeout(() => {
            router.push(`/${dataNovel?.novelSlug}/danh-sach-chuong`);
          }, 1000);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error("[chapters_POST]", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:w-full lg:order-1 space-y-6">
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chương</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <TextEditor
                    value={field.value}
                    onChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="my-10" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditChapterForm;
