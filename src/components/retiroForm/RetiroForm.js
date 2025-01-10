import React, { useState } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";

export default function RetiroForm() {
  const [materiales, setMateriales] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [formData, setFormData] = useState({
    id_material: null,
    id_empleado: null,
    cantidad: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchMateriales = async (value) => {
    try {
      const response = await fetch(`/api/retiros?query=${value}`);
      const data = await response.json();
      setMateriales(data.materials || []);
    } catch (error) {
      console.error("Error al buscar materiales:", error);
      setError("No se pudo cargar la lista de materiales.");
    }
  };

  const handleSearchTrabajadores = async (value) => {
    try {
      const response = await fetch(`/api/trabajadores?query=${value}`);
      const data = await response.json();
      setTrabajadores(data.employees || []);
    } catch (error) {
      console.error("Error al buscar trabajadores:", error);
      setError("No se pudo cargar la lista de trabajadores.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/retiros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ id_material: null, id_empleado: null, cantidad: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Error al registrar el retiro.");
      }
    } catch (error) {
      console.error("Error al registrar el retiro:", error);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: "16px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          padding: 4,
          backgroundColor: "#1f1f1f",
          borderRadius: "16px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#f5f5f5",
            fontFamily: "Roboto, sans-serif",
            textAlign: "center",
          }}
        >
          Registrar Retiro
        </Typography>

        <Autocomplete
          options={materiales}
          getOptionLabel={(option) => option.nombre || ""}
          onInputChange={(event, value) => handleSearchMateriales(value)}
          onChange={(event, value) =>
            setFormData({ ...formData, id_material: value?.id || null })
          }
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {" "}
              {/* Clave única para cada opción */}
              {option.nombre}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Material"
              variant="outlined"
              sx={{
                backgroundColor: "#333",
                borderRadius: 1,
                width: "100%",
                color: "#b3b3b3",
              }}
            />
          )}
        />

        <Autocomplete
          options={trabajadores}
          getOptionLabel={(option) => option.nombre || ""}
          onInputChange={(event, value) => handleSearchTrabajadores(value)}
          onChange={(event, value) =>
            setFormData({ ...formData, id_empleado: value?.id || null })
          }
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {" "}
              {/* Clave única para cada opción */}
              {option.nombre}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Trabajador"
              variant="outlined"
              sx={{
                backgroundColor: "#333",
                borderRadius: 1,
                width: "100%",
              }}
            />
          )}
        />

        <TextField
          label="Cantidad"
          type="number"
          value={formData.cantidad}
          onChange={(event) =>
            setFormData({ ...formData, cantidad: Number(event.target.value) })
          }
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "#333",
            borderRadius: 1,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Registrar Retiro"
          )}
        </Button>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%" }}>
            Retiro registrado con éxito
          </Alert>
        )}
      </Container>
    </Box>
  );
}
