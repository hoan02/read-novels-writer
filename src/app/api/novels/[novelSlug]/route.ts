import Novel from "@/lib/models/novel.model";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { novelSlug: string } }
) => {
  try {
    await connectToDB();
    const { userId } = auth();
    const novel = await Novel.findOne({
      novelSlug: params.novelSlug,
    });

    if (!novel) {
      return new NextResponse(JSON.stringify({ error: "Novel not found" }), {
        status: 404,
      });
    }

    if (novel.uploader !== userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    return NextResponse.json(novel, { status: 200 });
  } catch (err) {
    console.log("[novel_GET]", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
};

// export const POST = async (
//   req: NextRequest,
//   { params }: { params: { novelId: string } }
// ) => {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     const uploader = userId;

//     await connectToDB();

//     let novel = await Novel.findById(params.novelId);

//     if (!novel) {
//       return new NextResponse("Novel not found", { status: 404 });
//     }

//     const { name, type, author, description, urlCover } = await req.json();
//     const slug = generateSlug(name);

//     novel = await Novel.findByIdAndUpdate(
//       params.novelId,
//       { name, slug, type, uploader, author, description, urlCover },
//       { new: true }
//     );

//     await novel.save();

//     return NextResponse.json(novel, { status: 200 });
//   } catch (err) {
//     console.log("[novelId_POST]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

// export const DELETE = async (
//   req: NextRequest,
//   { params }: { params: { novelId: string } }
// ) => {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const novel = await Novel.findByIdAndDelete(params.novelId);

//     if (!novel) {
//       return new NextResponse("Novel not found", { status: 404 });
//     }

//     return new NextResponse("Novel is deleted", { status: 200 });
//   } catch (err) {
//     console.log("[novelId_DELETE]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };
