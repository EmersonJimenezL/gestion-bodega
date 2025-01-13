"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function RetirosMaterialView() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Ruta para volver a la pagina anterior
  };

  const handleWorkerView = () => {
    router.push("/vista-trabajador");
  };

  const handleProductView = () => {
    router.push("/vista-producto");
  };

  const handleRetiroView = () => {
    router.push("/vista-retiros");
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/retiros");
        if (!response.ok) {
          throw new Error("Error al obtener los datos.");
        }
        const result = await response.json();
        console.log("Datos obtenidos:", result);
        setData(result); // Asignamos los datos a la variable 'data'
        setFilteredData(result); // Inicializamos los datos filtrados
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (retiro) => retiro.nombre_empleado.toLowerCase().includes(term) // Filtrar solo por nombre de empleado
      )
    );
  };

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

  if (!filteredData || filteredData.length === 0) {
    return (
      <Typography color="textSecondary" align="center">
        No hay datos disponibles o los datos son inválidos.
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
        Gestión de retiros
      </Typography>

      {/* Barra de búsqueda solo por nombre de empleado */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar por empleado"
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

        {/* Otros botones */}
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
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Material</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Fecha de Retiro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((retiro) => (
              <TableRow
                key={retiro.id_retiro}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#2a2f3a", // Alternar colores en filas
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "#1f2733",
                  },
                }}
              >
                <TableCell align="center">{retiro.id_retiro}</TableCell>
                <TableCell align="center">{retiro.id_material}</TableCell>
                <TableCell align="center">{retiro.nombre_empleado}</TableCell>
                <TableCell align="center">{retiro.nombre_material}</TableCell>
                <TableCell align="center">{retiro.cantidad}</TableCell>
                <TableCell align="center">
                  {new Date(retiro.fecha_retiro).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
