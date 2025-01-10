import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

<<<<<<< HEAD
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
=======
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query"); // El término de búsqueda

  if (query) {
    try {
      const results = await pool.query(
        "SELECT id, nombre FROM EMPLEADOS WHERE nombre LIKE ? LIMIT 10",
        [`%${query}%`]
      );
      return NextResponse.json({ employees: results });
    } catch (error) {
      console.error("Error al buscar trabajadores:", error);
      return NextResponse.json(
        { error: "Error al buscar trabajadores." },
        { status: 500 }
      );
    }
>>>>>>> 4f057c0f767374449cd317203d1b32042dff7348
  }

  // Comportamiento por defecto
  const results = await pool.query("SELECT * FROM EMPLEADOS");
  return NextResponse.json({ employees: results });
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

    // Validar que todos los campos estén presentes
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

    // Validar que el RUT tenga el formato correcto
    const rutRegex = /^[0-9]{7,8}-[0-9Kk]{1}$/;
    if (!rutRegex.test(rut)) {
      return NextResponse.json(
        { message: "RUT no válido. El formato debe ser 12345678-9." },
        { status: 400 }
      );
    }

    // Verificar si ya existe un empleado con el mismo RUT
    const [existingEmployee] = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE rut = ?",
      [rut]
    );

    if (existingEmployee.length > 0) {
      return NextResponse.json(
        { message: "El RUT ya está registrado." },
        { status: 409 }
      );
    }

    // Insertar el nuevo empleado
    const [results] = await pool.query("INSERT INTO EMPLEADOS SET ?", {
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      area_trabajo,
      cargo,
    });

    // Retornar los datos del nuevo empleado
    return NextResponse.json({
      id: results.insertId,
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
