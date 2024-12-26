"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export default function ProductView() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Nuevo estado para verificar si es cliente

  useEffect(() => {
    // Marca cuando se monta el componente en el cliente
    setIsClient(true);

    // Función para cargar los productos
    async function cargarTrabajadores() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/trabajadores"
        );
        setTrabajadores(data.message); // Suponiendo que la respuesta es 'data.message'
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga de datos
      }
    }
    cargarTrabajadores();
  }, []);

  // Condición para asegurarnos de que solo se renderiza en el cliente
  if (!isClient) {
    return null; // No renderizar nada hasta que el componente se haya montado
  }

  // Mostrar mensaje de carga mientras los productos están siendo cargados
  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Cargando productos...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          textAlign: "center",
          fontSize: { xs: "18px", md: "24px" },
        }}
      >
        Lista de trabajadores
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
          maxWidth: "100%", // Asegura que la tabla no exceda el ancho del contenedor
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            "& th, & td": { whiteSpace: "nowrap" }, // Para evitar que el texto se desborde
          }}
          size="small"
          aria-label="responsive table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1a202c" }}>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                RUT
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                NOMBRE
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                APELLIDO PATERNO
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                APELLIDO MATERNO
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                AREA DE TRABAJO
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                CARGO
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                FECHA DE REGISTRO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trabajadores.map((trabajador) => (
              <TableRow
                key={trabajador.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#f8f9fa",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {trabajador.id}
                </TableCell>
                <TableCell align="center">{trabajador.rut}</TableCell>
                <TableCell align="center">{trabajador.nombre}</TableCell>
                <TableCell align="center">
                  {trabajador.apellido_paterno}
                </TableCell>
                <TableCell align="center">
                  {trabajador.apellido_materno}
                </TableCell>
                <TableCell align="center">{trabajador.area_trabajo}</TableCell>
                <TableCell align="center">{trabajador.cargo}</TableCell>
                <TableCell align="center">
                  {trabajador.fecha_registro}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
