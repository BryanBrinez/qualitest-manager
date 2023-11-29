"use client";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import React from "react";
import Axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function page() {
  const { data } = useSession();
  const [dataProjects, setDataProject] = useState([]);

  console.log(data?.user?.email);
  const dataProject = async () => {
    try {
      const response = await Axios.get(
        `/api/project/email/${data?.user?.email}`
      );
      setDataProject(response.data);
    } catch (error) {
      console.error("No encontro al usuario que esta iniciado", error);
    }
  };

  useEffect(() => {
    if (data?.user?.email) {
      dataProject();
      console.log(" hizo 1")
    }
    
  }, [data?.user?.email]);

  return (
    <div>
      <Link
        href={"proyectos/crear-proyecto"}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        crear proyecto
      </Link>

      <div className="p-2">
        {dataProjects.map((project, index) => (
          <div key={index} className="mb-2">
            {" "}
            <Link href={`proyectos/${project._id}`}>
            <ProjectCard projectData={project} emailUser={data?.user?.email} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
