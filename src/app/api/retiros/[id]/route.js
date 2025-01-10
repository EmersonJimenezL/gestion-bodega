import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta el parámetro ID" },
        { status: 400 }
      );
    }

    const [results] = await pool.query(
      "SELECT * FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );

    if (results.length === 0) {
      return NextResponse.json(
        { message: "Retiro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta el parámetro ID" },
        { status: 400 }
      );
    }

    const [results] = await pool.query(
      "DELETE FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Retiro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al eliminar el retiro" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta el parámetro ID" },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Verificar si los datos son válidos
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No se proporcionaron datos para actualizar" },
        { status: 400 }
      );
    }

    // Actualizar los datos
    const [updateResult] = await pool.query(
      "UPDATE RETIROS_MATERIAL SET ? WHERE ID = ?",
      [data, params.id]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { message: "Retiro no encontrado" },
        { status: 404 }
      );
    }

    // Obtener el retiro actualizado
    const [updatedRetire] = await pool.query(
      "SELECT * FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );

    return NextResponse.json(updatedRetire[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al actualizar el retiro" },
      { status: 500 }
    );
  }
}
