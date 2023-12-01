
export default function ProjectCard({ projectData, emailUser}) {
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const userRole =
    projectData.teamMembers.find((member) => member.user === emailUser)?.role ||
    "Rol no definido";

  return (
   
    <div className="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          {projectData.name}
        </h3>

        <p className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
          {projectData.description}
        </p>

        <div className="text-sm text-neutral-500 dark:text-neutral-300">
          <strong>Rol en el proyecto:</strong> {userRole}
        </div>

        <div className="flex flex-col text-sm text-neutral-500 dark:text-neutral-300 mb-3">
          <p>
            <strong>Fecha de inicio:</strong>{" "}
            {formatDate(projectData.startDate)}
          </p>
          <p>
            
            <strong>Fecha de finalización:</strong>
            {" "}
            {projectData.endDate
              ? formatDate(projectData.endDate)
              : "Indefinido"}
          </p>
        </div>
        {/* Aquí puedes añadir más campos del proyecto como desees */}
      </div>
    </div>
  );
}
