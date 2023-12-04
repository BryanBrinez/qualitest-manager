import { connectDB } from "@/libs/mongodb";
import TestCase from "@/models/testcase";

export async function PUT(request, { params }) {
  const { _id } = params;
  const updateData = await request.json();

  try {
    await connectDB();
    const filter = { _id: _id };
    const update = { ...updateData };

    const testCase = await TestCase.findByIdAndUpdate(filter, update, {
      new: true,
    });
    if (!testCase) {
      return new Response(JSON.stringify({ message: "Test case not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(testCase));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  const { _id } = params;

  try {
    await connectDB();

    const testCase = await TestCase.findByIdAndDelete(_id);
    if (!testCase) {
      return new Response(JSON.stringify({ message: "Test case not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Test case deleted successfully" }));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}


export async function GET(request, { params }) {
  const { _id } = params;
  

  try {
    await connectDB();


    const testCase = await TestCase.findById(_id);
    
    if (!testCase) {
      return new Response(JSON.stringify({ message: "testCase not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(testCase));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}