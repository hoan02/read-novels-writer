"use server";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import Chapter from "@/lib/models/chapter.model";

export const getChapter = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    const novel = await Novel.findOne({
      novelSlug: novelSlug,
    });

    if (!novel) {
      return NextResponse.json(
        { message: "Không tìm thấy truyện!" },
        { status: 404 }
      );
    }

    if (novel.uploader !== userId) {
      return NextResponse.json(
        { message: "Bạn không có quyền truy cập!" },
        { status: 403 }
      );
    }

    return NextResponse.json(novel, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Không tìm được truyện" },
      { status: 500 }
    );
  }
};

export const getChapters = async (novelSlug: string) => {
  try {
    await connectToDB();
    const chapters = await Chapter.find({
      novelSlug,
    });

    return NextResponse.json(chapters, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Không tìm thấy danh sách truyện!" },
      { status: 500 }
    );
  }
};
