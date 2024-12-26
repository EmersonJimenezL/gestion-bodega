// src/app/api/login/route.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const dbConfig = {
  // host: "192.168.0.193",
  host: "127.0.0.1",
  user: "Galut_Rendich",
  password: "Gestion-Bodega-2",
  port: "3306",
  database: "gestionbodega",
};

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Username and password are required" }),
      { status: 400 }
    );
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 401 }
      );
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Contraseña incorrecta" }),
        { status: 401 }
      );
    }

    // Añade esta línea para verificar que JWT_SECRET tiene un valor
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error en la consulta:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
