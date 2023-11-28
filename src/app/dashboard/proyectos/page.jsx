"use client";
import { useState } from "react";
import Axios from "axios";

const ProjectForm = () => {
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

      const teamMembers = [...project.teamMembers];

      console.log(teamMembers)

      console.log(teamMembers)
      if (response.statusText === "OK") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar datos al backend
    console.log(project);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium ">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            required
            minLength="3"
            maxLength="50"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium ">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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

export default ProjectForm;
