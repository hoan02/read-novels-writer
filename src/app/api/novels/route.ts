import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";

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
