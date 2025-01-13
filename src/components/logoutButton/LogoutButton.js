"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Llamar a la ruta para cerrar sesión en el servidor
    await fetch("/api/login", {
      method: "DELETE", // Usamos DELETE para cerrar sesión
    });

    // Redirige al usuario a la página de inicio de sesión
    router.push("/inicio-sesion");
  };

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
      }}
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
