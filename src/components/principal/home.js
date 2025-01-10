"use client";
import React from "react";
import { Box, Button, Typography, Zoom } from "@mui/material";
import { useRouter } from "next/navigation";

export default function FloatingButtons() {
  const router = useRouter();

  // Funciones para redirigir
  const navigateToInventory = () => {
    router.push("/vista-producto");
  };

  const navigateToWorkers = () => {
    router.push("/vista-trabajador");
  };

  const navigateToRegisterWorker = () => {
    router.push("/registro-trabajador");
  };

  const navigateToRegisterMaterial = () => {
    router.push("/registro-producto");
  };

  const navigateToWithdrawals = () => {
    router.push("/vista-retiros");
  };

  const navigateToRegisterWithdrawals = () => {
    router.push("/registro-retiro");
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#1a202c", // Fondo oscuro para la página
        minHeight: "100vh",
        color: "#fff",
        position: "relative",
        display: "flex",
        justifyContent: "center", // Centrado de los botones
        alignItems: "center", // Centrado de los botones
        flexDirection: "column", // Los botones estarán en columna
        overflow: "hidden", // Evitar desbordamiento
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "15%", // Título más centrado y atractivo
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#fff",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Sombra para el texto
          zIndex: 1, // Asegura que esté por encima de los botones
        }}
      >
        Sistema de Gestión
      </Typography>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "20px",
          justifyItems: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Zoom in={true} timeout={500}>
          <Button
            sx={{
              backgroundColor: "#4A5568", // Gris oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px", // Botón más grande
              height: "120px", // Botón más grande
              borderRadius: "50%", // Botón circular
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Sombra más pronunciada
              "&:hover": {
                backgroundColor: "#2D3748",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite", // Animación de flotación constante
            }}
            onClick={navigateToInventory}
          >
            Inventario
          </Button>
        </Zoom>

        <Zoom in={true} timeout={600}>
          <Button
            sx={{
              backgroundColor: "#2D3748", // Gris oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px", // Botón más grande
              height: "120px", // Botón más grande
              borderRadius: "50%", // Botón circular
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#4A5568",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite",
            }}
            onClick={navigateToWorkers}
          >
            Trabajadores
          </Button>
        </Zoom>

        <Zoom in={true} timeout={700}>
          <Button
            sx={{
              backgroundColor: "#2B6CB0", // Azul oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#3182CE",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite",
            }}
            onClick={navigateToRegisterWorker}
          >
            Registro de Trabajadores
          </Button>
        </Zoom>

        <Zoom in={true} timeout={800}>
          <Button
            sx={{
              backgroundColor: "#4A5568", // Gris oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#2D3748",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite",
            }}
            onClick={navigateToRegisterMaterial}
          >
            Registro de Material
          </Button>
        </Zoom>

        <Zoom in={true} timeout={900}>
          <Button
            sx={{
              backgroundColor: "#38B2AC", // Verde oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#319795",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite",
            }}
            onClick={navigateToWithdrawals}
          >
            Retiros
          </Button>
        </Zoom>

        <Zoom in={true} timeout={1000}>
          <Button
            sx={{
              backgroundColor: "#2C5282", // Azul oscuro
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#2B6CB0",
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              padding: "0",
              minWidth: "auto",
              animation: "float 2s ease-in-out infinite",
            }}
            onClick={navigateToRegisterWithdrawals}
          >
            Registro de Retiros
          </Button>
        </Zoom>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px); /* Subir 10px */
          }
          100% {
            transform: translateY(0); /* Regresar a su posición original */
          }
        }
      `}</style>
    </Box>
  );
}
