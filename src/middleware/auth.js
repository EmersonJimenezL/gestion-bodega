// src/middleware/auth.js
"use client";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega el usuario decodificado a la solicitud
    next(); // Pasa al siguiente middleware o ruta
  } catch (err) {
    return res.status(403).json({ message: "Token no válido o expirado." });
  }
};
