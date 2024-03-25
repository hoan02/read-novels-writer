import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Novel from "@/lib/models/Novel";
import Chapter from "@/lib/models/Chapter";
import { generateSlug } from "@/lib/utils";

export const GET = async (
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) => {
  try {
    await connectToDB();

    const chapter = await Chapter.findById(params.chapterId);

    if (!chapter) {
      return new NextResponse(
        JSON.stringify({ message: "Chapter not found" }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(chapter, { status: 200 });
  } catch (err) {
    console.log("[chapterId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { chapterName, content } = await req.json();
    const chapter = await Chapter.findByIdAndUpdate(params.chapterId, {
      chapterName,
      content,
    });

    return NextResponse.json(chapter, { status: 200 });
  } catch (err) {
    console.log("[novelId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const chapter = await Chapter.findByIdAndDelete(params.chapterId);

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    return new NextResponse("Chapter is deleted", { status: 200 });
  } catch (err) {
    console.log("[chapterId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
