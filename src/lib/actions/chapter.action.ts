"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Chapter from "@/lib/models/chapter.model";
import Novel from "@/lib/models/novel.model";

export const createChapter = async (formData) => {
  const { novelSlug, chapterName, chapterNumber, content, addChapterType } =
    formData;
  try {
    await connectToDB();
    if (addChapterType === "insert") {
      const chaptersToUpdate = await Chapter.find({
        novelSlug: novelSlug,
        chapterNumber: { $gte: chapterNumber },
      });

      for (const chapter of chaptersToUpdate) {
        chapter.chapterNumber += 1;
        await chapter.save();
      }
    }

    const newChapter = await Chapter.create({
      novelSlug,
      chapterName,
      chapterNumber,
      content,
    });

    await Novel.findOneAndUpdate(
      { slug: novelSlug },
      {
        $inc: { numberOfChapter: 1 },
      }
    );

    revalidatePath(`/writer/${novelSlug}`);
    return { success: true, message: "Chương đã được tạo thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể tạo chương!");
  }
};

export const updateChapter = async (formData) => {
  const { _id, chapterName, content } = formData;
  console.log(_id, chapterName, content);
  try {
    await connectToDB();
    const chapter = await Chapter.findByIdAndUpdate(
      _id,
      {
        chapterName,
        content,
      },
      {
        new: true,
      }
    );
    if (!chapter) {
      throw new Error("Không tìm thấy chương!");
    }
    return { success: true, message: "Chương đã được cập nhật!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể cập nhật chương!");
  }
};

export const deleteChapter = async (chapterId) => {
  try {
    await connectToDB();
    const chapter = await Chapter.findByIdAndDelete(chapterId);
    if (!chapter) {
      throw new Error("Không tìm thấy chương!");
    }
    return { success: true, message: "Chương đã được xóa!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể xóa chương!");
  }
};
