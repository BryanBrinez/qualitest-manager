import { connectDB } from "@/libs/mongodb";
import Project from "@/models/project";

export async function GET(request,{params}) {
  const { _id } = params;

  try {
    await connectDB();

    const project = await Project.findById(_id);
    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}



export async function PUT(request,{params}) {
    const { _id } = params;
    const updateData = await request.json();
  
    try {
      await connectDB();
      const filter = { _id: _id };
      const update = { ...updateData };


      
      const project = await Project.findByIdAndUpdate(filter, update, { new: true });
      if (!project) {
        return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(project));
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 400 });
    }
  }


  export async function DELETE(request,{params}) {
    const { _id } = params;
  
    try {
      await connectDB();
  
      const project = await Project.findByIdAndDelete(_id);
      if (!project) {
        return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: "Project deleted successfully" }));
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 400 });
    }
  }