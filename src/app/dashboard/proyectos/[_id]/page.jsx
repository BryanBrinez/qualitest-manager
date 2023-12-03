"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page({ params }) {
  const { _id } = params;
  const [dataProjects, setDataProject] = useState([]);
  const { data } = useSession();
  const [adminPermission, setAdminPermission] = useState(false);

  const dataProject = async () => {
    try {
      const response = await Axios.get(`/api/project/${_id}`);
      setDataProject(response.data);
      const isAdmin = response.data?.teamMembers?.some(
        (teamMember) =>
          data?.user?.email === teamMember.user &&
          teamMember.role === "Administrador"
      );
      setAdminPermission(isAdmin);
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  useEffect(() => {
    dataProject();

    // Verifica si el usuario es administrador cuando 'dataProjects' cambia.
    
  }, []);

  return (
    <div className="gap-2 text-white">
      <div className="pb-2">
        <div className="border border-gray-800 rounded p-4 space-y-4 bg-neutral-700">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-lg">Prueba proyecto</div>

            {adminPermission && (
              <Link
                href={`edit/${_id}`}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Editar
              </Link>
            )}
          </div>

          <p className="text-gray-300">Descripcion prueba</p>
          <div className="flex justify-between">
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
              Inicio: 29/10/2023
            </span>
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
              Fin: 22/11/2023
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg">Equipo de trabajo.</h2>
            <div className=" text-white px-3 py-1 rounded-full text-sm">
              gustavo@gmail.com - tester
            </div>
            <div className=" text-white px-3 py-1 rounded-full text-sm">
              bryan@hotmail.com - Administrador
            </div>
          </div>
        </div>
      </div>

      <div className="pb-2">
        <div className="border border-gray-800 rounded p-4 space-y-4 bg-neutral-700">
          pruebas
        </div>
      </div>
      <div className="pb-2">
        <div className="border border-gray-800 rounded p-4 space-y-4 bg-neutral-700">
          errores
        </div>
      </div>
    </div>
  );
}
