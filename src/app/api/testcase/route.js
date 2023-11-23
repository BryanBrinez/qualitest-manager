import { connectDB } from "@/libs/mongodb";
import TestCase from "@/models/testcase";

export async function POST(request) {
  const testData = await request.json();

  try {
    await connectDB();

    // Crear un nuevo caso de prueba utilizando los datos recibidos en la solicitud
    const newTestCase = new TestCase(testData);

    // Guardar el caso de prueba en la base de datos
    const savedTestCase = await newTestCase.save();

    return new Response(JSON.stringify(savedTestCase), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
