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
    const results = await pool.query(
      "SELECT * FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );

    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Retiro no encontrado",
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
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta el parámetro ID" },
        { status: 400 }
      );
    }
    const results = await pool.query(
      "DELETE FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Retiro no encontrado",
        },
        { status: 404 }
      );
    }

    // return new Response(null, { status: 204 });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No se proporcionaron datos para actualizar" },
        { status: 400 }
      );
    }

    const results = pool.query("UPDATE RETIROS_MATERIAL SET ? WHERE ID = ?", [
      data,
      params.id,
    ]);

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedRetire = await pool.query(
      "SELECT * FROM RETIROS_MATERIAL WHERE ID = ?",
      [params.id]
    );
    console.log(results);

    return NextResponse.json(updatedRetire[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
