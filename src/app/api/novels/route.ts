import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import { auth } from "@clerk/nextjs";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const novels = await Novel.find({
      uploader: userId,
    }).sort({ createdAt: "desc" });

    return NextResponse.json(novels, { status: 200 });
  } catch (err) {
    console.log("[novels_GET]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
