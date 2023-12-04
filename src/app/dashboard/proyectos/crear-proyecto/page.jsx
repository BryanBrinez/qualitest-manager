"use client";
import { useState } from "react";
import Axios from "axios";
import { useSession } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { data } = useSession();
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    teamMembers: [{ user: "", role: "", isValidUser: null, errorMessage: "" }],
    test: [],
  });

  const [error, setError] = useState(null);

  const checkUserExistence = async (email, index) => {
    try {
      const response = await Axios.get(`/api/user/${email}`);
      console.log(response)

      console.log(response.data)

      const teamMembers = [...project.teamMembers];

      console.log(teamMembers);
      if (response.status === 200) {
        teamMembers[index].isValidUser = true;
        teamMembers[index].errorMessage = "";
      } else {
        teamMembers[index].isValidUser = false;
        teamMembers[index].errorMessage = "Usuario no encontrado";
      }
      setProject({ ...project, teamMembers });
    } catch (error) {
      console.error("Error al verificar el usuario:", error);
      const teamMembers = [...project.teamMembers];
      teamMembers[index].isValidUser = false;
      teamMembers[index].errorMessage = "Error al verificar el usuario";
      setProject({ ...project, teamMembers });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const teamMembers = [...project.teamMembers];
    teamMembers[index][name] = value;
    setProject({ ...project, teamMembers });

    if (name === "role" && teamMembers[index].user) {
      checkUserExistence(teamMembers[index].user, index);
    }
  };

  const handleAddMember = () => {
    setProject({
      ...project,
      teamMembers: [...project.teamMembers, { user: "", role: "" }],
    });
  };

  const handleRemoveMember = (index) => {
    const teamMembers = [...project.teamMembers];
    teamMembers.splice(index, 1);
    setProject({ ...project, teamMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir las fechas a objetos Date para compararlas
    const startDate = new Date(project.startDate);
    const endDate = project.endDate ? new Date(project.endDate) : null;

    // Verificar si endDate es anterior a startDate
    if (endDate && endDate < startDate) {
      setError("La fecha final no puede ser anterior a la fecha inicial");
      return; // Detener la función si la fecha final es inválida
    }

    // todos isValidUser = true
    const areAllUsersValid = project.teamMembers.every(
      (member) => member.isValidUser === true
    );

    if (!areAllUsersValid) {
      setError("Hay miembros del equipo con información de usuario inválida");
      return;
    }

    // Agregar el usuario administrador al arreglo de teamMembers
    const updatedTeamMembers = [
      ...project.teamMembers.map(({ user, role }) => ({ user, role })), // Limpiar campos no necesarios
      { user: data?.user?.email, role: "Administrador" },
    ];

    // Crear una versión final del proyecto para enviar
    const finalProject = {
      ...project,
      teamMembers: updatedTeamMembers,
    };

    // va el post
    try {
      const res = await Axios.post("/api/project", finalProject);

      swal({
        title: "Se ha creado su proyecto",
        icon: "success",
      }).then((value) => {
        // Redirigir al usuario después de que presione "Aceptar" en la alerta
        router.push("/dashboard/proyectos");
      });
      
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium ">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
            minLength="3"
            maxLength="50"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium ">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-black"
          ></textarea>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium ">
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={(e) => {
              setProject({ ...project, startDate: e.target.value });
              setError(null); // Resetear el estado de error
            }}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium ">
            Fecha de Fin
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            onChange={(e) =>
              setProject({ ...project, endDate: e.target.value })
            }
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-black"
          />
        </div>

        <div>
          {project.teamMembers.map((member, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="user"
                placeholder="Email del Usuario"
                value={member.user}
                onChange={(e) => handleChange(e, index)}
                className={`block w-full sm:text-sm rounded-md text-black ${
                  member.errorMessage
                    ? "border-2 border-red-500"
                    : "border border-gray-300"
                }`}
              />
              {member.errorMessage && (
                <p className="text-red-500 text-sm">{member.errorMessage}</p>
              )}
              <input
                type="text"
                name="role"
                placeholder="Rol"
                value={member.role}
                onChange={(e) => handleChange(e, index)}
                className="block w-full sm:text-sm border-gray-300 rounded-md text-black"
              />
              {project.teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMember(index)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMember}
            className="text-blue-500"
          >
            Agregar miembro
          </button>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Proyecto
        </button>
      </form>
    </div>
  );
};


