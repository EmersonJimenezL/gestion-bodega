"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario ya tiene una sesión activa
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/vista-producto");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("lastActivity", Date.now()); // Guarda el tiempo de actividad
      router.push("/inicio");
    } catch (err) {
      setError("Inicio de sesión fallido. Por favor, revisa tus credenciales.");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#1a202c",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: "silver",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" component="h1" color="black" gutterBottom>
              Bienvenido
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Inicia sesión para continuar
            </Typography>
          </Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                background: "black",
              }}
            >
              Ingresar
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
