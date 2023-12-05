
export default function ErrorCard({ errorData, emailUser}) {
  
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    //const userRole =
      //projectData.teamMembers.find((member) => member.user === emailUser)?.role ||
      //"Rol no definido";
  
    return (
     
      <div className="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {errorData.description}
          </h3>
  
          <p className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
            {errorData.severity}
          </p>
          <p className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
            {errorData.status}
          </p>
  
          <div className="text-sm text-neutral-500 dark:text-neutral-300">
            <strong>Proyecto:</strong> {errorData.testCase?.project.name}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-300">
            <strong>Prueba:</strong> {errorData.testCase?.title}
          </div>

  
          
          {/* Aquí puedes añadir más campos del proyecto como desees */}
        </div>
      </div>
    );
  }
  