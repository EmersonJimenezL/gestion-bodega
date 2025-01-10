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
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    async function cargarProductos() {
      try {
        const { data } = await axios.get("/api/products/");
        setProducts(data); // Usa `data` directamente porque ya es un array.
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    cargarProductos();
  }, []);

  const handleUpdate = (id) => {
    router.push(`/registro-producto?id=${id}`);
  };

  const handleDelete = async (productId) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await axios.delete("/api/products/" + productId);
      window.location.reload();
    }
  };

  const handleBack = () => {
    router.back(); // Ruta para volver a la pagina anterior
  };

  const handleWorkerView = () => {
    router.push("/vista-trabajador");
  };

  const handleRegisterProduct = () => {
    router.push("/registro-producto");
  };

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Cargando productos...
        </Typography>
      </Box>
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
        Gestión de Productos
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
          onClick={handleWorkerView}
        >
          Trabajadores
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRegisterProduct}
        >
          Registro de producto
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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Categoría</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Unidad de Medida</TableCell>
              <TableCell align="center">Precio Unitario</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#2a2f3a", // Alternar colores en filas
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "#1f2733",
                  },
                }}
              >
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.nombre}</TableCell>
                <TableCell align="center">{product.descripcion}</TableCell>
                <TableCell align="center">{product.categoria}</TableCell>
                <TableCell align="center">{product.cantidad}</TableCell>
                <TableCell align="center">{product.unidad_medida}</TableCell>
                <TableCell align="center">{product.precio_unitario}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleUpdate(product.id)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(product.id)}
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
