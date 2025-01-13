"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

export default function TrabajadoresView() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [filteredTrabajadores, setFilteredTrabajadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const cargarTrabajadores = async () => {
      try {
        const { data } = await axios.get("/api/trabajadores");
        setTrabajadores(data);
        setFilteredTrabajadores(data); // Inicializamos los trabajadores filtrados
      } catch (error) {
        console.error("Error al cargar los trabajadores:", error);
      } finally {
        setIsLoading(false);
      }
    };
    cargarTrabajadores();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredTrabajadores(
      trabajadores.filter((trabajador) =>
        trabajador.nombre.toLowerCase().includes(term)
      )
    );
  };

  const handleUpdate = (id) => {
    router.push(`/registro-trabajador?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este trabajador?")) {
      try {
        await axios.delete(`/api/trabajadores/${id}`);
        setTrabajadores(
          trabajadores.filter((trabajador) => trabajador.id !== id)
        );
      } catch (error) {
        console.error("Error al eliminar trabajador:", error);
      }
    }
  };

  const handleBack = () => {
    router.back(); // Ruta para volver a la pagina anterior
  };

  const handleProductView = () => {
    router.push("/vista-producto");
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
          Cargando trabajadores...
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
        Gestión de trabajadores
      </Typography>

      {/* Barra de búsqueda */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar trabajador"
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
          onClick={handleRegisterWorker}
        >
          Registro de trabajadores
        </Button>

        <Button
          variant="outlined"
          color="info"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleProductView}
        >
          Listado de Material
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
              <TableCell align="center">RUT</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido Paterno</TableCell>
              <TableCell align="center">Apellido Materno</TableCell>
              <TableCell align="center">Área de Trabajo</TableCell>
              <TableCell align="center">Cargo</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrabajadores.map((trabajador) => (
              <TableRow
                key={trabajador.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#2a2f3a", // Alternar colores en filas
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "#1f2733",
                  },
                }}
              >
                <TableCell align="center">{trabajador.id}</TableCell>
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
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleUpdate(trabajador.id)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(trabajador.id)}
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
