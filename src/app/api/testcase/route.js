import { connectDB } from "@/libs/mongodb";
import TestCase from "@/models/testcase";
import Project from "@/models/project";

export async function POST(request) {
  const testData = await request.json();

  try {
    await connectDB();

    // Crear un nuevo caso de prueba utilizando los datos recibidos en la solicitud
    const newTestCase = new TestCase(testData);

    // Guardar el caso de prueba en la base de datos
    const savedTestCase = await newTestCase.save();

    await Project.findByIdAndUpdate(
      testData.project,
      { $push: { test: savedTestCase._id } },
      { new: true }
    );

    

    return new Response(JSON.stringify(savedTestCase), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
