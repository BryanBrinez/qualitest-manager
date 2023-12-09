"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios"; // Asegúrate de importar Axios
import { useSession } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { prueba } = params;
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [formData, setFormData] = useState(null); // Inicializa como null
  const [permission, setPermission] = useState(false);

  const [errores, setError] = useState(null);

  const loadData = async () => {
    try {
      const test = await Axios.get(`/api/testcase/${prueba}`);

      const testData = test.data;

      console.log(testData);
      if (testData) {
        setFormData({
          title: testData.title || "",
          description: testData.description || "",
          steps: testData.steps || "",
          status: testData.status || "",
          result: testData.result || "",
          priority: testData.priority || "",
          stage: testData.stage || "",

          // ...otros campos
        });

        if (test.data.assignedTo === sessionData?.user?.email) {
          setPermission(true);
        }

        const proj = await Axios.get(`/api/project/${test.data.project}`);

        const usuarioExiste = proj.data.teamMembers.some(
          (objeto) => objeto.user === sessionData?.user?.email
        );
        setPermission(usuarioExiste);

        console.log(usuarioExiste);
      }
    } catch (error) {
      console.error("Hubo un error", error);
      // Manejo de errores
    }
  };

  useEffect(() => {
    if (sessionData?.user?.email && prueba) {
      loadData();
    }
  }, [sessionData?.user?.email, prueba]);

  if (!formData) {
    return <div>Cargando...</div>; // Renderización condicional
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`/api/testcase/${prueba}`, formData);

      swal({
        title: "Se ha actualzado su prueba",
        icon: "success",
      }).then((value) => {
        // Redirigir al usuario después de que presione "Aceptar" en la alerta
        router.push(`/dashboard/pruebas/${prueba}`);
      });
    } catch (error) {
      setError(error.response?.data.message);
    }
  };
  return (
    <div>
      {permission ? (
        <>
          <h2 className="text-lg font-bold mb-4">Editar Error</h2>
          {errores && (
            <div className="bg-red-500 text-white p-2 mb-2">{errores}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Titulo
              </label>
              <input
                type="title"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Pasos
              </label>
              <input
                type="steps"
                name="steps"
                id="steps"
                required
                value={formData.steps}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Resultados
              </label>
              <input
                type="result"
                name="result"
                id="result"
                required
                value={formData.result}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Descripción
              </label>
              <input
                type="text"
                name="description"
                id="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
                >
                  Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccione la severidad</option>
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Integración">Integracióno</option>
                  <option value="Pre-producción">Pre-producción</option>
                  <option value="Producción">Producción</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="severity"
                  className="block text-sm font-medium mb-2"
                >
                  Prioridad
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccione la severidad</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccione la severidad</option>
                  <option value="Pending">Pendiente</option>
                  <option value="In Progress">En progreso</option>
                  <option value="Completed">Completado</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar Cambios
            </button>
          </form>
        </>
      ) : (
        <> no permitido</>
      )}
    </div>
  );
}
