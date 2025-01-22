"use client";
import React from "react";
import { Box, Button, Typography, Zoom } from "@mui/material";
import { useRouter } from "next/navigation";

export default function FloatingButtons() {
  const router = useRouter();

  // Funciones para redirigir
  const navigateTo = (path) => {
    router.push(path);
  };

  const buttonStyles = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textTransform: "none",
    color: "#fff", // Letra blanca
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
    transition:
      "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
    padding: "0",
    minWidth: "auto",
    animation: "float 2s ease-in-out infinite",
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
        {/* Botones */}
        {[
          {
            color: " #34495e ",
            hover: "#2D3748",
            path: "/vista-producto",
            label: "Listado de materiales",
            delay: 500,
          },
          {
            color: " #2e4053 ",
            hover: "#4A5568",
            path: "/vista-trabajador",
            label: "Listado de trabajadores",
            delay: 600,
          },
          {
            color: " #2c3e50 ",
            hover: "#319795",
            path: "/vista-retiros",
            label: "Listado de retiros",
            delay: 900,
          },
          {
            color: " #212f3d ",
            hover: "#3182CE",
            path: "/registro-trabajador",
            label: "Registro de trabajadores",
            delay: 700,
          },
          {
            color: " #212f3c ",
            hover: "#2D3748",
            path: "/registro-producto",
            label: "Registro de material",
            delay: 800,
          },
          {
            color: " #1b2631 ",
            hover: "#2B6CB0",
            path: "/registro-retiro",
            label: "Registro de retiros",
            delay: 1000,
          },
        ].map(({ color, hover, path, label, delay }, index) => (
          <Zoom key={index} in={true} timeout={delay}>
            <Button
              sx={{
                ...buttonStyles,
                backgroundColor: color, // Color del botón
                "&:hover": {
                  backgroundColor: hover, // Hover del botón
                },
              }}
              onClick={() => navigateTo(path)}
            >
              {label}
            </Button>
          </Zoom>
        ))}
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
