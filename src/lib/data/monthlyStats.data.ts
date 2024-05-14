"use server";

import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongodb/mongoose";
import createResponse from "@/utils/createResponse";
import MonthlyStats from "../models/monthlyStats.model";

interface StatResponse {
  name: string;
  value: number;
}

export const getMonthlyStats = async () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  try {
    const { userId } = auth();
    await connectToDB();
    const monthlyStats = await MonthlyStats.findOne({
      clerkId: userId,
      month,
      year,
    });
    return createResponse(monthlyStats, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getAllMonthlyStats = async (year: number) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const monthlyStats = await MonthlyStats.find({
      clerkId: userId,
      year: year,
    })
      .sort({ month: 1 })
      .exec();

    const res: StatResponse[] = monthlyStats.map((stats) => ({
      name: `${stats.month + 1}/${stats.year}`,
      value: stats.readCount,
    }));

    return createResponse(res, "Success!", 200);
  } catch (err) {
    console.error(err);
    return createResponse(null, "Error", 500);
  }
};
