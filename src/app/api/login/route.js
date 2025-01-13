import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const dbConfig = {
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Token expira en 15 minutos
    });

    const response = new Response(
      JSON.stringify({ message: "Inicio de sesión exitoso" }),
      { status: 200 }
    );

    // Establece la cookie del token
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("Error en la consulta:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}

// Ruta para cerrar sesión (eliminar cookie)
export async function DELETE(req) {
  const response = new Response(
    JSON.stringify({ message: "Sesión cerrada con éxito" }),
    { status: 200 }
  );

  // Elimina la cookie "token" configurando Max-Age a 0
  response.headers.append(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure"
  );

  return response;
}
