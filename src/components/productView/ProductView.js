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
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    async function cargarProductos() {
      try {
        const { data } = await axios.get("/api/products/");
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    cargarProductos();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) => product.nombre.toLowerCase().includes(term))
    );
  };

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
    router.back();
  };

  const handleWorkerView = () => {
    router.push("/vista-trabajador");
  };

  const handleRegisterWorker = () => {
    router.push("/registro-trabajador");
  };

  const handleRegisterProduct = () => {
    router.push("/registro-producto");
  };

  const handleRegisterRetiro = () => {
    router.push("/registro-retiro");
  };

  const handleRetiroView = () => {
    router.push("/vista-retiros");
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
        backgroundColor: "#1a202c",
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
        Gestión de Inventario
      </Typography>

      {/* Barra de búsqueda */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar material"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#2d3748",
            borderRadius: "8px",
            input: { color: "#e2e8f0" },
          }}
        />
      </Box>

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
          Listado de trabajadores
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRegisterWorker}
        >
          Registro de trabajadores
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRegisterProduct}
        >
          Registro de material
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRetiroView}
        >
          Listado de retiros
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleRegisterRetiro}
        >
          Registro de retiros
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
          overflowX: "auto",
          backgroundColor: "#2d3748",
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
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#2a2f3a" },
                  "&:nth-of-type(even)": { backgroundColor: "#1f2733" },
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
