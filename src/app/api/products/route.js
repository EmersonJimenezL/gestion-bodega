import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM inventario_material");
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
    const {
      nombre,
      descripcion,
      categoria,
      cantidad,
      unidad_medida,
      precio_unitario,
    } = await request.json();

    // Validaciones de campos obligatorios
    if (
      !nombre ||
      !categoria ||
      !cantidad ||
      !unidad_medida ||
      !precio_unitario
    ) {
      return NextResponse.json(
        { message: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    // Validaciones de tipos y valores
    if (typeof nombre !== "string" || typeof categoria !== "string") {
      return NextResponse.json(
        {
          message:
            "Los campos 'nombre' y 'categoria' deben ser cadenas de texto.",
        },
        { status: 400 }
      );
    }

    if (
      typeof cantidad !== "number" ||
      typeof precio_unitario !== "number" ||
      cantidad < 0 ||
      precio_unitario < 0
    ) {
      return NextResponse.json(
        {
          message:
            "Los campos 'cantidad' y 'precio_unitario' deben ser números positivos.",
        },
        { status: 400 }
      );
    }

    if (typeof unidad_medida !== "string") {
      return NextResponse.json(
        { message: "El campo 'unidad_medida' debe ser una cadena de texto." },
        { status: 400 }
      );
    }

    // Inserción en la base de datos
    const results = await pool.query("INSERT INTO inventario_material SET ?", {
      nombre,
      descripcion,
      categoria,
      cantidad,
      unidad_medida,
      precio_unitario,
    });

    return NextResponse.json({
      id: results.insertId,
      nombre,
      categoria,
      cantidad,
      precio_unitario,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
