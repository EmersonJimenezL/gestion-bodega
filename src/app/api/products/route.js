import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  const results = await pool.query("SELECT * FROM INVENTARIO_MATERIAL");
  console.log(results);
  return NextResponse.json(results);
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
