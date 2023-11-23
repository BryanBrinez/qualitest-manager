import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/project";

export async function POST(request) {
  const { name, description, startDate, endDate, teamMembers } = await request.json();

  try {
    await connectDB();

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      teamMembers, // Asegúrate de que esto sea un array de objetos con los campos 'user' y 'role'
      test: [], // Inicializa vacío o con casos de prueba predeterminados si es necesario
    });

    const savedProject = await newProject.save();

    return NextResponse.json(savedProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }
  }
}
