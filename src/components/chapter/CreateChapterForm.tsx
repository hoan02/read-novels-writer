"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../custom-ui/TextEditor";

const formSchema = z.object({
  chapterName: z.string().min(2).max(150),
  chapterNumber: z.coerce.number(),
  content: z.string().min(1).trim(),
  // isLock: z.boolean(),
  // price: z.number(),
  // isPublic: z.boolean(),
  addChapterType: z.string(),
});

interface CreateChapterFormProps {
  dataNovel?: NovelType | null;
}

const CreateChapterForm: React.FC<CreateChapterFormProps> = ({ dataNovel }) => {
  const router = useRouter();
  const numNextChap = (dataNovel?.numberOfChapter ?? 0) + 1;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterName: "",
      chapterNumber: numNextChap,
      content: "",
      // isLock: false,
      // price: 0,
      // isPublic: true,
      addChapterType: "next",
    },
  });

  useEffect(() => {
    const addChapterType = form.getValues("addChapterType");
    if (addChapterType === "next") {
      form.setValue("chapterNumber", numNextChap);
    }
  }, [form.getValues("addChapterType")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const chapterRequest = fetch("/api/chapters", {
        method: "POST",
        body: JSON.stringify({ ...values, novelId: dataNovel?._id }),
      });

      toast.promise(chapterRequest, {
        loading: "Loading...",
        success: "Chương đã được tạo mới.",
        error: "Có lỗi xảy ra! Vui lòng thử lại.",
      });

      const res = await chapterRequest;

      if (res.ok) {
        setTimeout(() => {
          router.push(`/novels/${dataNovel?._id}/list-chapter`);
        }, 1000);
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
          <div className="lg:flex gap-6">
            <FormField
              control={form.control}
              name="addChapterType"
              render={({ field }) => (
                <FormItem className="w-[200px]">
                  <FormLabel>Cách đánh STT chương</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="next">Chương tiếp</SelectItem>
                      <SelectItem value="insert">Chèn chương</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chapterNumber"
              render={({ field }) => (
                <FormItem className="lg:mt-0 mt-4">
                  <FormLabel>STT chương</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      disabled={form.getValues("addChapterType") === "next"}
                      min={1}
                      max={numNextChap}
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("addChapterType") === "insert" && (
              <p className="lg:mt-10 mt-4 text-sm text-red-500">
                {`Lưu ý: STT chương khi chèn phải nằm trong khoảng [1-${numNextChap}]`}
              </p>
            )}
          </div>
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
          {/* <FormField
            control={form.control}
            name="isLock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa chương</FormLabel>
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá chương</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chương công khai</FormLabel>
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button className="bg-blue-1 text-white my-10" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateChapterForm;
