"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page({ params }) {
  const { prueba } = params;
  const { data } = useSession();
  const [dataProjects, setDataProject] = useState([]);
  const [Permission, setPermission] = useState(false);

  const [testerPermission, setTesterPermission] = useState(false);
  const [test, setTests] = useState({});
  const [errors, setErrors] = useState([]);

  const dataTest = async () => {
    try {
      const test = await Axios.get(`/api/testcase/${prueba}`);

      setTests(test.data);
      if (test.data.assignedTo === data?.user?.email) {
        setPermission(true);
      }

      const proj = await Axios.get(`/api/project/${test.data.project}`);
      setDataProject(proj.data);

      const usuarioExiste = proj.data.teamMembers.some(
        (objeto) => objeto.user === data?.user?.email
      );
      setPermission(usuarioExiste);
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  useEffect(() => {
    dataTest();

    // Verifica si el usuario es administrador cuando 'dataProjects' cambia.
  }, [data?.user?.email]);

  return (
    <div className="gap-2 text-white">
      {Permission ? (
        <div className="gap-2 text-white">
          <div className="pb-2">
            <div className="border border-gray-800 rounded p-4 space-y-4 bg-neutral-700">
            <h1>Informacion del Proyecto</h1>
              
                <h2 className="text-white font-bold text-lg">
                  {dataProjects.name} ID: {dataProjects._id}
                </h2>
              

              <p className="text-gray-300">{dataProjects.description}</p>
              <div className="flex justify-between">
                <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                  {dataProjects.startDate}
                </span>
                <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                  {dataProjects.endDate}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg">Equipo de trabajo.</h2>

                {dataProjects.teamMembers?.map((member, index) => (
                  <div
                    key={index}
                    className=" text-white px-3 py-1 rounded-full text-sm"
                  >
                    {member.user} - {member.role}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pb-2">
            <div className="border border-gray-800 rounded  pb-4 bg-neutral-700">
              <div className="flex justify-between items-center">
                <h2 className="text-white font-bold text-lg p-4">Prueba ID: {test._id}</h2>
              </div>

              <div className="border border-gray-500 rounded p-4 bg-neutral-700">
                <div className="flex justify-between items-center">
                  <h2 className=" text-white px-3 py-1 rounded-full text-sm">
                    {test.title}
                  </h2>

                  {Permission && (
                    <Link
                      href={`/dashboard/pruebas/edit/${test._id}`}
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Editar
                    </Link>
                  )}
                </div>
                <div>
                  <p>{test.description}</p>
                  <p>{test.steps}</p>
                  <p>{test.status}</p>
                  <p>{test.assignedTo}</p>
                  <p>{test.stage}</p>
                  <p>{test.priority}</p>
                  <p>{test.createdBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> Permiso denegado</>
      )}
    </div>
  );
}
