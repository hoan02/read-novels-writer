import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import { generateSlug } from "@/utils/generateSlug";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const novels = await Novel.find().sort({ createdAt: "desc" });

    return NextResponse.json(novels, { status: 200 });
  } catch (err) {
    console.log("[novels_GET]", err);
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
    const { name, type, author, description, urlCover } = await req.json();
    const slug = generateSlug(name);
    const existingNovel = await Novel.findOne({ slug });
    if (existingNovel) {
      return new NextResponse("Novel already exists", { status: 400 });
    }
    
    const uploader = userId;
    const newNovel = await Novel.create({
      name,
      slug,
      uploader,
      type,
      author,
      description,
      urlCover,
    });
    await newNovel.save();
    return NextResponse.json(newNovel, { status: 200 });
  } catch (err) {
    console.log("novels_POST", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";