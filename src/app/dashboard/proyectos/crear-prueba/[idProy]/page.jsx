"use client";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSession } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function TestCaseForm({ params }) {
  const router = useRouter();
  const { data } = useSession();
  const { idProy } = params;
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [testCase, setTestCase] = useState({
    project: idProy,
    createdBy: data?.user?.email,
    title: "",
    description: "",
    steps: "",
    expectedResult: "",
    status: "Pending",
    stage: "",
    priority: "",
    assignedTo: "",
  });
  

  // Esta función maneja el autocompletado para el campo 'assignedTo'
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "assignedTo") {
      setInputValue(value);
      if (value.length > 0) {
        const matchedMembers = teamMembers.filter((member) =>
          member.user.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(matchedMembers);
      } else {
        setSuggestions([]);
      }
    }
  };
  const handleSuggestionClick = (email) => {
    setInputValue(email);
    setTestCase({ ...testCase, assignedTo: email });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await Axios.post("/api/testcase", testCase);

      swal({
        title: "Se ha creado su Prueba",
        icon: "success",
      }).then((value) => {
        // Redirigir al usuario después de que presione "Aceptar" en la alerta
        router.push(`/dashboard/proyectos/${idProy}`);
      });
      
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  const dataMembers = async () => {
    const res = await Axios.get(`/api/project/${idProy}`);
    setTeamMembers(res.data.teamMembers);
  };

  useEffect(() => {
    dataMembers();
  }, []);

  return (
    <div className="container mx-auto p-8 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto text-white "
      >
        <h2 className="text-2xl font-semibold mb-6">Crear Prueba</h2>
        {error && (
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}

        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium  mb-2">
            Título de la Prueba
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) =>
              setTestCase({ ...testCase, title: e.target.value })
            }
            required
            className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium  mb-2"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            onChange={(e) =>
              setTestCase({ ...testCase, description: e.target.value })
            }
            required
            rows="3"
            className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="steps" className="block text-sm font-medium  mb-2">
            Pasos
          </label>
          <textarea
            id="steps"
            name="steps"
            onChange={(e) =>
              setTestCase({ ...testCase, steps: e.target.value })
            }
            required
            rows="4"
            className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="expectedResult"
            className="block text-sm font-medium  mb-2"
          >
            Resultado Esperado
          </label>
          <input
            type="text"
            id="expectedResult"
            name="expectedResult"
            onChange={(e) =>
              setTestCase({ ...testCase, expectedResult: e.target.value })
            }
            required
            className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="stage" className="block text-sm font-medium  mb-2">
            Etapa
          </label>
          <select
            id="stage"
            name="stage"
            onChange={(e) =>
              setTestCase({ ...testCase, stage: e.target.value })
            }
            required
            className="block w-full pl-3 pr-10 py-2 text-black text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccione una etapa</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Integración">Integración</option>
            <option value="Pre-producción">Pre-producción</option>
            <option value="Producción">Producción</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="priority" className="block text-sm font-medium  mb-2">
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            onChange={(e) =>
              setTestCase({ ...testCase, priority: e.target.value })
            }
            required
            className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccione una prioridad</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-white mb-2"
          >
            Asignar a
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={inputValue}
            onChange={handleChange}
            autoComplete="off"
            className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full text-black bg-white shadow-lg max-h-60 rounded-md text-sm overflow-auto">
              {suggestions.map((member) => (
                <li
                  key={member.user}
                  onClick={() => handleSuggestionClick(member.user)}
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  {member.user}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Prueba
          </button>
        </div>
      </form>
    </div>
  );
}
