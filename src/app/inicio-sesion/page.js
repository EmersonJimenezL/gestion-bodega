"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!res.error) {
      // Redirigir a la página protegida o dashboard
      window.location.href = "/dashboard";
    } else {
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h1" style={{ marginBottom: 20 }}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
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
          style={{ marginTop: 20 }}
        >
          Iniciar Sesión
        </Button>
        {error && (
          <Typography color="error" style={{ marginTop: 20 }}>
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
}
