"use server";

import { auth } from "@clerk/nextjs/server";

import connectToDB from "../mongodb/mongoose";
import createResponse from "@/utils/createResponse";
import Nomination from "../models/nomination.model";

export const getNominations = async (startDate: Date) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const nominations = await Nomination.find({
      clerkId: userId,
      updatedAt: { $gte: startDate },
    });

    return createResponse(nominations, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
