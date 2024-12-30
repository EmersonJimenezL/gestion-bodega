"use client";
import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function TrabajadoresForm() {
  const [trabajador, setTrabajador] = useState({
    rut: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    area_trabajo: "",
    cargo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null); // Para manejar errores de la API
  const form = useRef(null);
  const router = useRouter(); // Para redirigir
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const areasValidas = ["Administración", "Producción", "Logística"];
  const cargosValidos = ["Operario", "Supervisor", "Gerente"];

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const cargarTrabajador = async () => {
        try {
          const { data } = await axios.get(`/api/trabajadores/${id}`);
          if (data) {
            setTrabajador(data);
          } else {
            setApiError("No se encontró el trabajador con este ID.");
          }
        } catch (error) {
          setApiError("Error al cargar el trabajador. Intente nuevamente.");
          console.error("Error al cargar el trabajador:", error);
        }
      };
      cargarTrabajador();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrabajador({
      ...trabajador,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Limpiar error al cambiar valor
    setApiError(null); // Limpiar error de la API
  };

  const validateForm = () => {
    const newErrors = {};
    if (!trabajador.rut) {
      newErrors.rut = "El RUT es obligatorio";
    }
    if (!trabajador.nombre) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!trabajador.apellido_paterno) {
      newErrors.apellido_paterno = "El apellido paterno es obligatorio";
    }
    if (!trabajador.apellido_materno) {
      newErrors.apellido_materno = "El apellido materno es obligatorio";
    }
    if (!trabajador.area_trabajo) {
      newErrors.area_trabajo = "Seleccione un área de trabajo";
    }
    if (!trabajador.cargo) {
      newErrors.cargo = "Seleccione un cargo";
    }

    // Validación de RUT (si se quiere un formato básico)
    const rutPattern = /^[0-9]{7,8}-[0-9kK]{1}$/;
    if (trabajador.rut && !rutPattern.test(trabajador.rut)) {
      newErrors.rut = "El RUT no tiene un formato válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing) {
        // Actualizar trabajador existente
        const response = await axios.put(`/api/trabajadores/${id}`, trabajador);
        if (response.status === 200) {
          alert("Trabajador actualizado correctamente");
        } else {
          setApiError("Error al actualizar el trabajador.");
        }
      } else {
        // Registrar un nuevo trabajador
        const response = await axios.post("/api/trabajadores/", trabajador);
        if (response.status === 200) {
          alert("Trabajador registrado correctamente");
        } else {
          setApiError("Error al registrar el trabajador.");
        }
      }

      // Redirigir a la vista de trabajadores después de un registro exitoso
      router.push("/vista-trabajador");

      // Limpiar el formulario y resetear el estado
      form.current.reset();
    } catch (error) {
      setApiError("Error al guardar el trabajador. Intente nuevamente.");
      console.error("Error al guardar el trabajador:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Fondo oscuro
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: 30,
          backgroundColor: "#1f1f1f", // Contenedor oscuro
          borderRadius: 15,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)", // Sombras más marcadas
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: "bold",
            color: "#f5f5f5",
            fontFamily: "Roboto, sans-serif",
            textAlign: "center",
          }}
        >
          {isEditing ? "Editar Trabajador" : "Registro de Trabajador"}
        </Typography>
        {apiError && (
          <Typography
            variant="body2"
            style={{
              color: "#f44336", // Rojo de error
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {apiError}
          </Typography>
        )}
        <TextField
          fullWidth
          label="RUT"
          variant="outlined"
          name="rut"
          value={trabajador.rut}
          onChange={handleChange}
          style={{
            backgroundColor: "#333", // Fondo oscuro para input
            borderRadius: 5,
            color: "#fff", // Texto blanco
            marginBottom: 10,
          }}
          error={Boolean(errors.rut)}
          helperText={errors.rut}
        />
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          name="nombre"
          value={trabajador.nombre}
          onChange={handleChange}
          style={{
            backgroundColor: "#333", // Fondo oscuro para input
            borderRadius: 5,
            color: "#fff", // Texto blanco
            marginBottom: 10,
          }}
          error={Boolean(errors.nombre)}
          helperText={errors.nombre}
        />
        <TextField
          fullWidth
          label="Apellido Paterno"
          variant="outlined"
          name="apellido_paterno"
          value={trabajador.apellido_paterno}
          onChange={handleChange}
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
            marginBottom: 10,
          }}
          error={Boolean(errors.apellido_paterno)}
          helperText={errors.apellido_paterno}
        />
        <TextField
          fullWidth
          label="Apellido Materno"
          variant="outlined"
          name="apellido_materno"
          value={trabajador.apellido_materno}
          onChange={handleChange}
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
            marginBottom: 10,
          }}
          error={Boolean(errors.apellido_materno)}
          helperText={errors.apellido_materno}
        />
        <FormControl
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            marginBottom: 10,
          }}
          error={Boolean(errors.area_trabajo)}
        >
          <InputLabel id="area-label" style={{ color: "#fff" }}>
            Área de Trabajo
          </InputLabel>
          <Select
            labelId="area-label"
            name="area_trabajo"
            value={trabajador.area_trabajo}
            onChange={handleChange}
            style={{
              color: "#fff",
              backgroundColor: "#333",
              borderRadius: 5,
            }}
          >
            {areasValidas.map((area) => (
              <MenuItem key={area} value={area}>
                {area}
              </MenuItem>
            ))}
          </Select>
          {errors.area_trabajo && (
            <Typography variant="body2" style={{ color: "#f44336" }}>
              {errors.area_trabajo}
            </Typography>
          )}
        </FormControl>
        <FormControl
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            marginBottom: 20,
          }}
          error={Boolean(errors.cargo)}
        >
          <InputLabel id="cargo-label" style={{ color: "#fff" }}>
            Cargo
          </InputLabel>
          <Select
            labelId="cargo-label"
            name="cargo"
            value={trabajador.cargo}
            onChange={handleChange}
            style={{
              color: "#fff",
              backgroundColor: "#333",
              borderRadius: 5,
            }}
          >
            {cargosValidos.map((cargo) => (
              <MenuItem key={cargo} value={cargo}>
                {cargo}
              </MenuItem>
            ))}
          </Select>
          {errors.cargo && (
            <Typography variant="body2" style={{ color: "#f44336" }}>
              {errors.cargo}
            </Typography>
          )}
        </FormControl>

        {/* Botones alineados horizontalmente */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 24px",
              }}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => router.back()}
              variant="outlined"
              style={{
                borderColor: "#007bff",
                color: "#007bff",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 24px",
              }}
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
