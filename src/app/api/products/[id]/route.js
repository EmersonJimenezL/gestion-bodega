import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const results = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      params.id
    );

    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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
    const results = await pool.query(
      "DELETE FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [params.id]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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
    const data = await request.json();
    const results = pool.query(
      "UPDATE inventario_material SET ? WHERE ID = ?",
      [data, params.id]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [params.id]
    );
    console.log(results);

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
