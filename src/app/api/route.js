import { NextResponse } from "next/server";
import { connectDB } from "../../libs/mongodb";




export const GET = async (request) => {
  try {
    await connectDB();


    return NextResponse.json("GET");
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};