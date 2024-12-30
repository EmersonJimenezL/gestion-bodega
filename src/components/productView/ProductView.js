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
        const { data } = await axios.get("/api/products/"); // Usar ruta relativa
        setProducts(data.message);
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
    if (confirm("Are you sure?")) {
      // Realizamos la eliminación y esperamos a que se complete
      const res = await axios.delete("/api/products/" + productId);
      // Recargamos la página para reflejar los cambios
      window.location.reload();
    }
  };

  if (!isClient) {
    return null;
  }

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
        Lista de Productos
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            "& th, & td": { whiteSpace: "nowrap" },
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
                Nombre
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Descripción
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Categoría
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Cantidad
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Unidad de Medida
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Precio Unitario
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#f8f9fa",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {product.id}
                </TableCell>
                <TableCell align="center">{product.nombre}</TableCell>
                <TableCell align="center">{product.descripcion}</TableCell>
                <TableCell align="center">{product.categoria}</TableCell>
                <TableCell align="center">{product.cantidad}</TableCell>
                <TableCell align="center">{product.unidad_medida}</TableCell>
                <TableCell align="center">{product.precio_unitario}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleUpdate(product.id)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
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
