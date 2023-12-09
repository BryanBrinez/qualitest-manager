"use client";
import Axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import ErrorCard from "@/components/ErrorCard";
import Link from "next/link";
import PruebaCard from "@/components/PruebaCard";

export default function Page() {
  const { data } = useSession();
  const [pruebas, setPrueba] = useState([])
  const [isLoading, setLoading] = useState(true);

  const dataError = async () => {
    try {
      const res = await Axios.get(`/api/testcase/email/${data?.user.email}`);
      setPrueba(res.data)
    } catch (error) {
      console.log("error" + error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataError();
  }, [data?.user.email]);

  return (
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
        pruebas.map((prueba, index) => (
          
          <div key={index} className="mb-2">
            <Link href={`pruebas/${prueba._id}`}>
            
              <PruebaCard pruebaData={prueba} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
