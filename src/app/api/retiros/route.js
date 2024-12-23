import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM RETIROS_MATERIAL");
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
    const { id_material, id_empleado, cantidad } = await request.json();
    // console.log(data);

    const results = await pool.query("INSERT INTO RETIROS_MATERIAL SET ?", {
      id_material,
      id_empleado,
      cantidad,
    });

    console.log(results);

    return NextResponse.json({
      id: results.insertId,
      id_material,
      id_empleado,
      cantidad,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
