import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const results = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE ID = ?",
      params.id
    );

    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Empleado no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const results = await pool.query("DELETE FROM EMPLEADOS WHERE ID = ?", [
      params.id,
    ]);

    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Empleado no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    // Usar await para esperar la consulta antes de continuar
    const results = await pool.query("UPDATE EMPLEADOS SET ? WHERE ID = ?", [
      data,
      params.id,
    ]);

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    // Obtener el empleado actualizado
    const updatedEmpleado = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE ID = ?",
      [params.id]
    );

    return NextResponse.json(updatedEmpleado[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
