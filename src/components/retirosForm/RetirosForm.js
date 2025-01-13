import { useEffect, useState } from "react";
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

export default function RegistroRetiros() {
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("/api/trabajadores");
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchEmpleados();
    fetchProductos();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFecha(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empleadoSeleccionado || !productoSeleccionado || !cantidad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const empleadoId = Number(empleadoSeleccionado);
    const productoId = Number(productoSeleccionado);
    const cantidadValor = Number(cantidad);

    if (isNaN(empleadoId) || isNaN(productoId) || isNaN(cantidadValor)) {
      alert("Los valores deben ser números válidos.");
      return;
    }

    if (cantidadValor <= 0) {
      alert("La cantidad debe ser mayor a cero.");
      return;
    }

    const data = {
      id_material: productoId,
      id_empleado: empleadoId,
      cantidad: cantidadValor,
    };

    try {
      const response = await fetch("/api/retiros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Retiro registrado con éxito");
      } else {
        alert("Error al registrar el retiro");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al registrar el retiro: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: 30,
          backgroundColor: "#1f1f1f",
          borderRadius: 15,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Registro de Retiros
        </Typography>
        <FormControl
          fullWidth
          style={{ backgroundColor: "#333", borderRadius: 5 }}
        >
          <InputLabel id="empleado-label" style={{ color: "#fff" }}>
            Seleccionar Empleado
          </InputLabel>
          <Select
            labelId="empleado-label"
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
            style={{ color: "#fff", backgroundColor: "#333", borderRadius: 5 }}
          >
            {empleados.map((empleado) => (
              <MenuItem key={empleado.id} value={empleado.id}>
                {empleado.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{ backgroundColor: "#333", borderRadius: 5 }}
        >
          <InputLabel id="producto-label" style={{ color: "#fff" }}>
            Seleccionar Producto
          </InputLabel>
          <Select
            labelId="producto-label"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            style={{ color: "#fff", backgroundColor: "#333", borderRadius: 5 }}
          >
            {productos.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          variant="outlined"
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            color: "white",
          }}
        />
        <TextField
          label="Fecha"
          variant="outlined"
          value={fecha}
          disabled
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
          }}
        />
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
              onClick={() => history.back()}
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
