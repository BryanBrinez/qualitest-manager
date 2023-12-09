import { useState,useEffect } from "react";

export default function PruebaCard({ pruebaData, emailUser}) {
  const [dataPrueba, setPruebaData] = useState({})
  
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    console.log("asdawd")
  
    //const userRole =
      //projectData.teamMembers.find((member) => member.user === emailUser)?.role ||
      //"Rol no definido";
  
      useEffect(() => {
        setPruebaData(pruebaData)
      }, []);    
    return (
     
      <div className="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {dataPrueba?.title}
          </h3>
  
          <p className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
            {dataPrueba?.description}
          </p>
          <p className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
            {dataPrueba?.status}
          </p>
  
          <div className="text-sm text-neutral-500 dark:text-neutral-300">
            <strong>Proyecto:</strong> {dataPrueba?.project?.name}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-300">
            <strong>Asignado por:</strong> {dataPrueba?.createdBy}
          </div>

  
          
          {/* Aquí puedes añadir más campos del proyecto como desees */}
        </div>
      </div>
    );
  }
  