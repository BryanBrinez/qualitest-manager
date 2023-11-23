import { connectDB } from "@/libs/mongodb";
import Error from "@/models/error";

export async function POST(request) {
  try {
    await connectDB();
    const errorData = await request.json();
    
    const newError = new Error(errorData);
    const savedError = await newError.save();

    return new Response(JSON.stringify(savedError));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
