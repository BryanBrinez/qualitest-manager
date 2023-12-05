"use client";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSession } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function ErrorForm({ params }) {
  const { idProy } = params;
  const router = useRouter();
  const { data } = useSession();
  const [error, setError] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [tests, setTests] = useState([]);

  const [inputValueAssignedTo, setInputValueAssignedTo] = useState("");
  const [inputValueTestCase, setInputValueTestCase] = useState("");
  const [suggestionsAssignedTo, setSuggestionsAssignedTo] = useState([]);
  const [suggestionsTestCase, setSuggestionsTestCase] = useState([]);
  const [errorDetails, setErrorDetails] = useState({
    description: "",
    severity: "",
    status: "New",
    testCase: "",
    assignedTo: "",
    reportedBy: data?.user?.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrorDetails({ ...errorDetails, [name]: value });
  };

  const dataMembers = async () => {
    const res = await Axios.get(`/api/project/${idProy}`);
    setTeamMembers(res.data.teamMembers);




    const testCasePromises = res.data.test.map(id => Axios.get(`/api/testcase/${id}`));
    const testCasesResponses = await Promise.all(testCasePromises);
    const testCasesDetails = testCasesResponses.map(response => response.data);

    // Actualizar el estado con los detalles de los casos de prueba
    setTests(testCasesDetails);

  };

  const handleAssignedToChange = (e) => {
    setInputValueAssignedTo(e.target.value);
    if (e.target.value.length > 0) {
      const matchedMembers = teamMembers.filter((member) =>
        member.user.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setSuggestionsAssignedTo(matchedMembers);
    } else {
      setSuggestionsAssignedTo([]);
    }
  };

  const handleAssignedToSuggestionClick = (email) => {
    setInputValueAssignedTo(email);
    setErrorDetails({ ...errorDetails, assignedTo: email });
    setSuggestionsAssignedTo([]);
  };

  const handleTestCaseChange = (e) => {
    setInputValueTestCase(e.target.value);
    if (e.target.value.length > 0) {
      const matchedTestCases = tests.filter((testCase) =>
        testCase.title?.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setSuggestionsTestCase(matchedTestCases);
    } else {
      setSuggestionsTestCase([]);
    }
  };

  const handleTestCaseSuggestionClick = (testCaseId) => {
    const selectedTestCase = tests.find(tc => tc._id === testCaseId);
    setInputValueTestCase(selectedTestCase.title);
    setErrorDetails({ ...errorDetails, testCase: testCaseId });
    setSuggestionsTestCase([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post("/api/error", errorDetails);

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

  // Cargar los datos necesarios para autocompletar
  useEffect(() => {
    dataMembers();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto text-white"
      >
        <h2 className="text-2xl font-semibold mb-6">Reportar Error</h2>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            required
            rows="3"
            className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="severity" className="block text-sm font-medium mb-2">
            Severidad
          </label>
          <select
            id="severity"
            name="severity"
            onChange={handleInputChange}
            required
            className="block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccione la severidad</option>
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium mb-2"
          >
            Asignado a
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={inputValueAssignedTo}
            onChange={handleAssignedToChange}
            autoComplete="off"
            className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {suggestionsAssignedTo.length > 0 && (
            <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md text-sm overflow-auto">
              {suggestionsAssignedTo.map((member) => (
                <li
                  key={member.user}
                  onClick={() => handleAssignedToSuggestionClick(member.user)}
                  className="cursor-pointer text-black hover:bg-gray-100 p-2"
                >
                  {member.user}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-6 relative">
          <label htmlFor="testCase" className="block text-sm font-medium mb-2">
            Caso de Prueba
          </label>
          <input
            type="text"
            id="testCase"
            name="testCase"
            value={inputValueTestCase}
            onChange={handleTestCaseChange}
            autoComplete="off"
            className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {suggestionsTestCase.length > 0 && (
            <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md text-sm overflow-auto">
              {suggestionsTestCase.map((testCase) => (
                <li
                  key={testCase._id}
                  onClick={() => handleTestCaseSuggestionClick(testCase._id)}
                  className="cursor-pointer text-black hover:bg-gray-100 p-2"
                >
                  {testCase.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reportar Error
        </button>
      </form>
    </div>
  );
}
