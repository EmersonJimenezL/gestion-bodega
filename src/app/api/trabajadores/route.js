import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM EMPLEADOS");

    // Verificamos si los resultados son los esperados
    console.log("Resultados de la consulta a EMPLEADOS:", results);

    // Aseguramos que la respuesta sea en formato JSON
    return NextResponse.json(results, {
      headers: {
        "Content-Type": "application/json", // Aseguramos que el encabezado sea correcto
      },
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    return NextResponse.json(
      { error: "Error al conectar con la base de datos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      area_trabajo,
      cargo,
    } = await request.json();

    // Validación de datos
    if (
      !rut ||
      !nombre ||
      !apellido_paterno ||
      !apellido_materno ||
      !area_trabajo ||
      !cargo
    ) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validación del formato del RUT
    const rutRegex = /^[0-9]{7,8}-[0-9Kk]{1}$/;
    if (!rutRegex.test(rut.trim())) {
      return NextResponse.json(
        { message: "RUT no válido. El formato debe ser 12345678-9." },
        { status: 400 }
      );
    }

    // Verificación de duplicados
    const [rows] = await pool.query("SELECT rut FROM EMPLEADOS WHERE rut = ?", [
      rut,
    ]);

    // Aseguramos que rows es un array válido
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(
        { message: "El RUT ya está registrado." },
        { status: 409 }
      );
    }

    // Inserción de datos
    const [insertResults] = await pool.query(
      "INSERT INTO EMPLEADOS (rut, nombre, apellido_paterno, apellido_materno, area_trabajo, cargo) VALUES (?, ?, ?, ?, ?, ?)",
      [rut, nombre, apellido_paterno, apellido_materno, area_trabajo, cargo]
    );

    // Confirmación de éxito en la inserción
    return NextResponse.json({
      id: insertResults.insertId,
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      area_trabajo,
      cargo,
    });
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
