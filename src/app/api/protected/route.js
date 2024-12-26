// src/app/api/protected-route.js
import { authMiddleware } from "../../../middleware/auth";

export default async function handler(req, res) {
  authMiddleware(req, res, () => {
    // Ahora puedes manejar la solicitud segura aquí
    res.status(200).json({ message: "Acceso concedido a la ruta protegida." });
  });
}
