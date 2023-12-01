"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Axios from "axios";
import { Skeleton } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";

export default function Page() {
  const { data } = useSession();
  const [dataProjects, setDataProject] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const dataProject = async () => {
    try {
      const response = await Axios.get(
        `/api/project/email/${data?.user?.email}`
      );
      setDataProject(response.data);
    } catch (error) {
      console.error("No encontró al usuario que está iniciado", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data?.user?.email) {
        await dataProject();
      }
    };

    fetchData();
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
        {isLoading ? (
          // Muestra el esqueleto mientras se cargan los datos

          <div className="p-2">
            {[...Array(3).keys()].map((index) => (
              <div key={index} className="mb-2">
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  variant="rounded"
                  animation="wave"
                  width={980}
                  height={190}
                />
              </div>
            ))}
          </div>
        ) : (
          // Mapea sobre cada proyecto y renderiza la tarjeta correspondiente
          dataProjects.map((project, index) => (
            <div key={index} className="mb-2">
              <Link href={`proyectos/${project._id}`}>
                <ProjectCard
                  projectData={project}
                  emailUser={data?.user?.email}
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
