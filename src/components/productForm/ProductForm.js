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
} from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductoForm() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    cantidad: 0,
    unidad_medida: "",
    precio_unitario: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const categoriasValidas = ["Herramienta", "Consumible"];
  const unidadesValidas = ["pieza", "kilogramo", "litro", "metro"];

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      // Cargar los datos del producto
      const cargarProducto = async () => {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          setProducto(data);
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      };
      cargarProducto();
    }
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación en el cliente
    if (!categoriasValidas.includes(producto.categoria)) {
      alert("La categoría seleccionada no es válida.");
      return;
    }

    if (!unidadesValidas.includes(producto.unidad_medida)) {
      alert("La unidad de medida seleccionada no es válida.");
      return;
    }

    try {
      if (isEditing) {
        // Actualizar producto
        await axios.put(`/api/products/${id}`, producto);
        alert("Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        await axios.post("/api/products/", producto);
        alert("Producto registrado correctamente");
      }
      router.push("/vista-producto");
      form.current.reset();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
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
          {isEditing ? "Editar Producto" : "Registro de Producto"}
        </Typography>

        <TextField
          fullWidth
          label="Nombre de producto"
          variant="outlined"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          fullWidth
          label="Descripción"
          variant="outlined"
          name="descripcion"
          onChange={handleChange}
          multiline
          rows={4}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        {/* Selector de categoría */}
        <FormControl
          fullWidth
          style={{ backgroundColor: "white", borderRadius: 1 }}
        >
          <InputLabel id="categoria-label">Categoría</InputLabel>
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
        </FormControl>

        <TextField
          fullWidth
          label="Cantidad"
          type="number"
          variant="outlined"
          name="cantidad"
          onChange={handleChange}
          style={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        {/* Selector de unidad de medida */}
        <FormControl
          fullWidth
          style={{ backgroundColor: "white", borderRadius: 1 }}
        >
          <InputLabel id="unidad-medida-label">Unidad de medida</InputLabel>
          <Select
            labelId="unidad-medida-label"
            name="unidad_medida"
            value={producto.unidad_medida}
            onChange={handleChange}
            variant="outlined"
            defaultValue="Unidad de medida"
          >
            {unidadesValidas.map((unidad) => (
              <MenuItem key={unidad} value={unidad}>
                {unidad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Precio Unitario"
          type="number"
          variant="outlined"
          name="precio_unitario"
          onChange={handleChange}
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
