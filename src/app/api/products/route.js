import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM inventario_material");
    return NextResponse.json(results); // Directamente los productos
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
      nombre,
      descripcion,
      categoria,
      cantidad,
      unidad_medida,
      precio_unitario,
    } = await request.json();
    // console.log(data);

    const results = await pool.query("INSERT INTO inventario_material SET ?", {
      nombre,
      descripcion,
      categoria,
      cantidad,
      unidad_medida,
      precio_unitario,
    });

    console.log(results);

    return NextResponse.json({
      id: results.insertId,
      nombre,
      categoria,
      cantidad,
      precio_unitario,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
