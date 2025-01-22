import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

// GET: Obtener los retiros
export async function GET() {
  try {
    const results = await pool.query(`
      SELECT 
        r.id AS id_retiro,
        r.id_material,
        r.id_empleado,
        r.cantidad,
        r.fecha_retiro,
        e.nombre AS nombre_empleado,
        m.nombre AS nombre_material
      FROM retiros_material r
      JOIN empleados e ON r.id_empleado = e.id
      JOIN inventario_material m ON r.id_material = m.id
    `);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json(
      { message: "Error al obtener los datos." },
      { status: 500 }
    );
  }
}

// POST: Registrar un nuevo retiro
export async function POST(req) {
  try {
    const body = await req.json();
    const { id_material, id_empleado, cantidad } = body;

    if (!id_material || !id_empleado || !cantidad) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO retiros_material (id_material, id_empleado, cantidad, fecha_retiro)
      VALUES (?, ?, ?, NOW())
    `,
      [id_material, id_empleado, cantidad]
    );

    return NextResponse.json({
      message: "Retiro registrado con éxito",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al registrar el retiro:", error);
    return NextResponse.json(
      { message: "Error al registrar el retiro." },
      { status: 500 }
    );
  }
}
