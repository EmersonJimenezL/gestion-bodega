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
    const fetchData = async (endpoint, setter, errorMsg) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(errorMsg);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(errorMsg, error);
      }
    };

    fetchData("/api/trabajadores", setEmpleados, "Error al obtener empleados");
    fetchData("/api/products", setProductos, "Error al obtener productos");
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

    const data = {
      id_material: Number(productoSeleccionado),
      id_empleado: Number(empleadoSeleccionado),
      cantidad: Number(cantidad),
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
        setEmpleadoSeleccionado("");
        setProductoSeleccionado("");
        setCantidad("");
      } else {
        const errorMsg = await response.json();
        alert(`Error al registrar el retiro: ${errorMsg.message}`);
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
        <FormControl fullWidth>
          <InputLabel id="empleado-label" style={{ color: "#fff" }}>
            Seleccionar Empleado
          </InputLabel>
          <Select
            labelId="empleado-label"
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
            style={{ color: "#fff", backgroundColor: "#333" }}
          >
            {empleados.map((empleado) => (
              <MenuItem key={empleado.id} value={empleado.id}>
                {empleado.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="producto-label" style={{ color: "#fff" }}>
            Seleccionar Producto
          </InputLabel>
          <Select
            labelId="producto-label"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            style={{ color: "#fff", backgroundColor: "#333" }}
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
          fullWidth
          style={{ backgroundColor: "#333", color: "#fff" }}
        />
        <TextField
          label="Fecha"
          variant="outlined"
          value={fecha}
          disabled
          fullWidth
          style={{ backgroundColor: "#333", color: "#fff" }}
        />
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => history.back()}
              variant="outlined"
              style={{ color: "#007bff", borderColor: "#007bff" }}
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
