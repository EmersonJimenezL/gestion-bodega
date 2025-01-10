"use client";

import { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";

export default function RetirosMaterialView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    router.back(); // Ruta para volver a la pagina anterior
  };

  const handleInventoriView = () => {
    router.push("/vista-producto");
  };

  const handleRegisterWorker = () => {
    router.push("/registro-trabajador");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/retiros");
        if (!response.ok) {
          throw new Error("Error al obtener los datos.");
        }
        const result = await response.json();
        console.log("Datos obtenidos:", result);

        // Actualizar el estado con los datos obtenidos
        if (Array.isArray(result) && result.length > 0) {
          setData(result); // Directamente asignamos los datos
        } else {
          setData([]); // Si no hay datos, aseguramos que sea un arreglo vacío
        }
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography> Cargando datos...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Typography color="textSecondary" align="center">
        No hay datos disponibles.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#1a202c", // Fondo oscuro
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontSize: { xs: "20px", md: "28px" },
          fontWeight: "bold",
        }}
      >
        Gestión de trabajadores
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleBack}
        >
          Volver
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleInventoriView}
        >
          Inventario
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRegisterWorker}
        >
          Registro de trabajador
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
          overflowX: "auto",
          backgroundColor: "#2d3748", // Color de fondo oscuro para la tabla
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            "& th": { color: "#e2e8f0", fontWeight: "bold" },
            "& td": { color: "#cbd5e0" },
          }}
          size="small"
          aria-label="responsive table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">ID Retiro</TableCell>
              <TableCell align="center">ID Material</TableCell>
              <TableCell align="center">ID Empleado</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Fecha de Retiro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((retiro) => (
              <TableRow
                key={retiro.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#2a2f3a", // Alternar colores en filas
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "#1f2733",
                  },
                }}
              >
                <TableCell align="center">{retiro.id}</TableCell>
                <TableCell align="center">{retiro.id_material}</TableCell>
                <TableCell align="center">{retiro.id_empleado}</TableCell>
                <TableCell align="center">{retiro.cantidad}</TableCell>
                <TableCell align="center">
                  {new Date(retiro.fecha_retiro).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleUpdate(retiro.id)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(retiro.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
