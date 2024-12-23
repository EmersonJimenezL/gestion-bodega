import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM EMPLEADOS");
    console.log(results);
    return NextResponse.json({ message: results });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    return NextResponse.json(
      { error: "Error al conectar con la base de datos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // request nos ayudara a obtener un formato json
  try {
    const {
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      area_trabajo,
      cargo,
    } = await request.json();

    const results = await pool.query("INSERT INTO EMPLEADOS SET ?", {
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      area_trabajo,
      cargo,
    });

    console.log(results);

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
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
