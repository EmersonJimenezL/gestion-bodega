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
        await axios.put(`/api/products/${id}`, producto);
        alert("Producto actualizado correctamente");
      } else {
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
        backgroundColor: "#1b1b1b",
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
          backgroundColor: "#242424",
          borderRadius: 20,
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: "bold",
            color: "#f5f5f5",
            fontFamily: "Roboto, sans-serif",
          }}
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
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
          }}
          InputProps={{
            style: { color: "#fff" },
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
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <FormControl
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
          }}
        >
          <InputLabel id="categoria-label" style={{ color: "#fff" }}>
            Categoría
          </InputLabel>
          <Select
            labelId="categoria-label"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            variant="outlined"
            style={{ color: "#fff" }}
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
            backgroundColor: "#333",
            borderRadius: 5,
            color: "#fff",
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <FormControl
          fullWidth
          style={{
            backgroundColor: "#333",
            borderRadius: 5,
          }}
        >
          <InputLabel id="unidad-medida-label" style={{ color: "#fff" }}>
            Unidad de medida
          </InputLabel>
          <Select
            labelId="unidad-medida-label"
            name="unidad_medida"
            value={producto.unidad_medida}
            onChange={handleChange}
            variant="outlined"
            style={{ color: "#fff" }}
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
                padding: "10px 20px",
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
                padding: "10px 20px",
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
