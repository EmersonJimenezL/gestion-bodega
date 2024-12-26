import { useState, useRef } from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    cantidad: 0,
    unidad_medida: "",
    precio_unitario: 0,
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const form = useRef(null);

  const categoriasValidas = ["Herramienta", "Consumible"];
  const unidadesValidas = ["pieza", "kilogramo", "litro", "metro"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]:
        name === "cantidad" || name === "precio_unitario"
          ? Number(value)
          : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!producto.nombre) tempErrors.nombre = "Este campo es obligatorio.";
    if (!producto.descripcion)
      tempErrors.descripcion = "Este campo es obligatorio.";
    if (!producto.categoria)
      tempErrors.categoria = "Este campo es obligatorio.";
    if (!producto.cantidad) tempErrors.cantidad = "Este campo es obligatorio.";
    if (!producto.unidad_medida)
      tempErrors.unidad_medida = "Este campo es obligatorio.";
    if (!producto.precio_unitario)
      tempErrors.precio_unitario = "Este campo es obligatorio.";

    if (!categoriasValidas.includes(producto.categoria)) {
      tempErrors.categoria = "La categoría seleccionada no es válida.";
    }

    if (!unidadesValidas.includes(producto.unidad_medida)) {
      tempErrors.unidad_medida =
        "La unidad de medida seleccionada no es válida.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const res = await axios.post("/api/products/", producto);
        console.log(res);

        form.current.reset();
        router.push("/vista-producto");
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
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
        backgroundColor: "#e0e0e0",
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          padding: 30,
          backgroundColor: "#f5f5f5",
          borderRadius: 20,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          style={{ fontWeight: "bold", color: "#333" }}
        >
          Registro de Producto
        </Typography>

        <TextField
          fullWidth
          label="Nombre de producto *"
          variant="outlined"
          name="nombre"
          onChange={handleChange}
          error={!!errors.nombre}
          helperText={errors.nombre}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          fullWidth
          label="Descripción *"
          variant="outlined"
          name="descripcion"
          onChange={handleChange}
          multiline
          rows={4}
          error={!!errors.descripcion}
          helperText={errors.descripcion}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        <FormControl
          fullWidth
          error={!!errors.categoria}
          style={{ backgroundColor: "white", borderRadius: 1 }}
        >
          <InputLabel id="categoria-label">Categoría *</InputLabel>
          <Select
            labelId="categoria-label"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            variant="outlined"
          >
            {categoriasValidas.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2" color="error">
            {errors.categoria}
          </Typography>
        </FormControl>

        <TextField
          fullWidth
          label="Cantidad *"
          type="number"
          variant="outlined"
          name="cantidad"
          onChange={handleChange}
          error={!!errors.cantidad}
          helperText={errors.cantidad}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        <FormControl
          fullWidth
          error={!!errors.unidad_medida}
          style={{ backgroundColor: "white", borderRadius: 1 }}
        >
          <InputLabel id="unidad-medida-label">Unidad de medida *</InputLabel>
          <Select
            labelId="unidad-medida-label"
            name="unidad_medida"
            value={producto.unidad_medida}
            onChange={handleChange}
            variant="outlined"
            defaultValue=""
          >
            {unidadesValidas.map((unidad) => (
              <MenuItem key={unidad} value={unidad}>
                {unidad}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2" color="error">
            {errors.unidad_medida}
          </Typography>
        </FormControl>

        <TextField
          fullWidth
          label="Precio Unitario *"
          type="number"
          variant="outlined"
          name="precio_unitario"
          onChange={handleChange}
          error={!!errors.precio_unitario}
          helperText={errors.precio_unitario}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px 20px",
          }}
        >
          Guardar Producto
        </Button>
      </Container>
    </form>
  );
}
