import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Chapter from "@/lib/models/Chapter";
import Novel from "@/lib/models/Novel";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const novelId = searchParams.get("novelId");
    await connectToDB();
    const chapters = await Chapter.find({ novelId: novelId }).sort({
      chapterNumber: 1,
    });

    return NextResponse.json(chapters, { status: 200 });
  } catch (err) {
    console.log("[chapters_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const { chapterName, chapterNumber, content, addChapterType, novelId } =
      await req.json();

    const novel = await Novel.findById(novelId);
    if (!novel) {
      return new NextResponse("Novel not found", { status: 404 });
    }

    if (addChapterType === "insert") {
      const chaptersToUpdate = await Chapter.find({
        novelId: novelId,
        chapterNumber: { $gte: chapterNumber },
      });

      for (const chapter of chaptersToUpdate) {
        chapter.chapterNumber += 1;
        await chapter.save();
      }
    }

    const newChapter = await Chapter.create({
      novelId,
      chapterName,
      chapterNumber,
      content,
    });

    await Novel.findByIdAndUpdate(novelId, {
      $push: { chapters: newChapter._id },
      $inc: { numberOfChapter: 1 },
    });

    return NextResponse.json(newChapter, { status: 200 });
  } catch (err) {
    console.log("Chapters_POST", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";