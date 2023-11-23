import { connectDB } from "@/libs/mongodb";
import Error from "@/models/error";

export async function GET(request, { params }) {
  const { _id } = params;

  try {
    await connectDB();
    const error = await Error.findById(_id);

    if (!error) {
      return new Response(JSON.stringify({ message: "Error not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(error));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const { _id } = params;
  const updateData = await request.json();

  try {
    await connectDB();

    const filter = { _id: _id };
    const update = { ...updateData };


    const updatedError = await Error.findByIdAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedError) {
      return new Response(JSON.stringify({ message: "Error not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedError));
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
    const deletedError = await Error.findByIdAndDelete(_id);

    if (!deletedError) {
      return new Response(JSON.stringify({ message: "Error not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Error deleted successfully" })
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
