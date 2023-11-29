import { connectDB } from "@/libs/mongodb";
import Project from "@/models/project";

export async function GET(request, { params }) {
  const { email } = params;

  try {
    await connectDB();
    const filter = { "teamMembers.user": email };  // Buscar proyectos donde el email se encuentre en teamMembers

    const projects = await Project.find(filter);
    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify({ message: "No projects found with the specified user" }), { status: 404 });
    }

    return new Response(JSON.stringify(projects));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
