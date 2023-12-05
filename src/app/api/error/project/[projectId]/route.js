import { connectDB } from "@/libs/mongodb";
import Error from "@/models/error";
import TestCase from "@/models/testcase";
import Project from "@/models/project";

export async function GET(request, { params }) {
  const { projectId } = params;

  try {
    await connectDB();

    // Obtener los casos de prueba asociados con el proyecto
    const project = await Project.findById(projectId).populate('test');
    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    const testCaseIds = project.test.map(testCase => testCase._id);

    // Obtener los errores asociados con esos casos de prueba
    const errors = await Error.find({ testCase: { $in: testCaseIds }}).populate('testCase');

    return new Response(JSON.stringify(errors));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
