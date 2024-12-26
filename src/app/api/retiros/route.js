import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM RETIROS_MATERIAL");
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
  try {
    const { id_material, id_empleado, cantidad } = await request.json();

    // Validaciones de datos
    if (!id_material || !id_empleado || !cantidad) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (
      typeof id_material !== "number" ||
      typeof id_empleado !== "number" ||
      typeof cantidad !== "number"
    ) {
      return NextResponse.json(
        {
          message:
            "Los campos id_material, id_empleado y cantidad deben ser números.",
        },
        { status: 400 }
      );
    }

    if (cantidad <= 0) {
      return NextResponse.json(
        { message: "La cantidad debe ser mayor a 0." },
        { status: 400 }
      );
    }

    // Validar existencia del material y empleado (opcional, requiere consultas adicionales)
    const [material] = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [id_material]
    );
    if (material.length === 0) {
      return NextResponse.json(
        { message: "El material especificado no existe." },
        { status: 404 }
      );
    }

    const [empleado] = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE ID = ?",
      [id_empleado]
    );
    if (empleado.length === 0) {
      return NextResponse.json(
        { message: "El empleado especificado no existe." },
        { status: 404 }
      );
    }

    // Insertar el retiro
    const results = await pool.query("INSERT INTO RETIROS_MATERIAL SET ?", {
      id_material,
      id_empleado,
      cantidad,
    });

    return NextResponse.json({
      id: results.insertId,
      id_material,
      id_empleado,
      cantidad,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
