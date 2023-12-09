"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios"; // Asegúrate de importar Axios
import { useSession } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { error } = params;
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [formData, setFormData] = useState(null); // Inicializa como null
  const [permission, setPermission] = useState(false);

  const [errores, setError] = useState(null);

  const loadData = async () => {
    try {
      const errRes = await Axios.get(`/api/error/${error}`);
      const errorData = errRes.data;
      if (errorData) {
        setFormData({
          description: errorData.description || "",
          severity: errorData.severity || "",
          status: errorData.status || "",
          // ...otros campos
        });

        

        if (errRes.data.assignedTo === sessionData?.user?.email) {
          setPermission(true);
        }
  
        const test = await Axios.get(`/api/testcase/${errRes.data.testCase}`);
        
  
        const proj = await Axios.get(`/api/project/${test.data.project}`);
        

        const usuarioExiste = proj.data.teamMembers.some(
          (objeto) => objeto.user === sessionData?.user?.email
        );
        setPermission(usuarioExiste);

        console.log(usuarioExiste)
      }
    } catch (error) {
      console.error("Hubo un error", error);
      // Manejo de errores
    }
  };

  useEffect(() => {
    if (sessionData?.user?.email && error) {
      loadData();
    }
  }, [sessionData?.user?.email, error]);

  if (!formData) {
    return <div>Cargando...</div>; // Renderización condicional
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`/api/error/${error}`, formData);

      swal({
        title: "Se ha actualzado su error",
        icon: "success",
      }).then((value) => {
        // Redirigir al usuario después de que presione "Aceptar" en la alerta
        router.push(`/dashboard/errores/${error}`);
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
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
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
                  htmlFor="severity"
                  className="block text-sm font-medium mb-2"
                >
                  Severidad
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccione la severidad</option>
                  <option value="Low">Baja</option>
                  <option value="Medium">Media</option>
                  <option value="High">Alta</option>
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
                  <option value="New">Nuevo</option>
                  <option value="In Progress">En progreso</option>
                  <option value="Resolved">Resuelto</option>
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
