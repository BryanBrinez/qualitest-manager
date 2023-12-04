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
  const [tests, setTests] = useState([]);

  const dataProject = async () => {
    try {
      const response = await Axios.get(`/api/project/${_id}`);
      setDataProject(response.data);
      const isAdmin = response.data?.teamMembers?.some(
        (teamMember) =>
          data?.user?.email === teamMember.user &&
          teamMember.role === "Administrador"
      );

      const processedTestIds = new Set();
      response.data?.test?.forEach((testId) => {
        if (!processedTestIds.has(testId)) {
          dataTest(testId);
          processedTestIds.add(testId);
        }
      });

      setAdminPermission(isAdmin);
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  const dataTest = async (testId) => {
    try {
      const response = await Axios.get(`/api/testcase/${testId}`);
      setTests((prevTests) => {
        // Verifica si el test ya está en el estado para evitar duplicados
        if (prevTests.some((test) => test._id === response.data._id)) {
          return prevTests;
        }
        return [...prevTests, response.data];
      });
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  useEffect(() => {
    dataProject();
    //dataTests();

    // Verifica si el usuario es administrador cuando 'dataProjects' cambia.
  }, []);

  return (
    <div className="gap-2 text-white">
      <div className="pb-2">
        <div className="border border-gray-800 rounded p-4 space-y-4 bg-neutral-700">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold text-lg">
              {dataProjects.name}
            </h2>

            {adminPermission && (
              <Link
                href={`edit/${_id}`}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Editar
              </Link>
            )}
          </div>

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
            <h2 className="text-white font-bold text-lg p-4">Pruebasss</h2>

            {adminPermission && (
              <Link
                href={`crear-prueba/${_id}`}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Crear Prueba
              </Link>
            )}
          </div>
          {tests?.map((test, index) => (
            <div
              key={index}
              className="border border-gray-500 rounded p-4 bg-neutral-700"
            >
              <div className="flex justify-between items-center">
                <h2 className=" text-white px-3 py-1 rounded-full text-sm">
                  {test.title}
                </h2>

                {adminPermission && (
                  <Link
                    href={`${_id}/crear-prueba`}
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
          ))}
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
