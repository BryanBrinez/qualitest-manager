import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function GET(request, {params}) {
  const { email } = params;

  try {
    await connectDB();

    const filter = { email: email };
    

    const user = await User.findOne(filter) 
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
