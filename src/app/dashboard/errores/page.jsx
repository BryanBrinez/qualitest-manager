"use client";
import Axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import ErrorCard from "@/components/ErrorCard";
import Link from "next/link";

export default function Page() {
  const { data } = useSession();
  const [errors, setErrors] = useState([])
  const [isLoading, setLoading] = useState(true);

  const dataError = async () => {
    try {
      const res = await Axios.get(`/api/error/email/${data?.user.email}`);
      setErrors(res.data)
    } catch (error) {
      console.log("error" + error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataError();
  }, []);

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
        errors.map((error, index) => (
          <div key={index} className="mb-2">
            <Link href={`errores/${error._id}`}>
   
              <ErrorCard errorData={error} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
