"use client"
import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { _id } = params;
  const [dataProjects, setDataProject] = useState([]);

  const dataProject = async () => {
    try {
      const response = await Axios.get(
        `/api/project/${_id}`
      );
      setDataProject(response.data);
    } catch (error) {
      console.error("hubo un error", error);
    }
  };
  useEffect(() => {
    
      dataProject();
    
  }, []);


  return <div>{JSON.stringify(dataProjects)}</div>;
}
