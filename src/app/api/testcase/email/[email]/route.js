import { connectDB } from "@/libs/mongodb";
import Error from "@/models/error";
import TestCase from "@/models/testcase";
import Project from "@/models/project"; // Asegúrate de importar el modelo Project

export async function GET(request, { params }) {
  const { email } = params; // Asumiendo que el email se pasa como un parámetro

  try {
    await connectDB();

    // Obtener todos los errores asignados al email especificado
    // y poblar los detalles del caso de prueba y la información del proyecto
    const testCaseAssignedToEmail = await TestCase.find({ assignedTo: email })
      .populate('project');

    if (testCaseAssignedToEmail.length === 0) {
      return new Response(JSON.stringify({ message: "No errors found for this email" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(testCaseAssignedToEmail));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
