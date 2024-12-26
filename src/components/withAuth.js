"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Cambia el estado inicial

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/inicio-sesion");
        } else {
          setIsAuthenticated(true);
        }
      }
    }, [router]);

    // Mientras se verifica la autenticación, mostramos un indicador de carga
    if (isAuthenticated === null) {
      return <div>Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
