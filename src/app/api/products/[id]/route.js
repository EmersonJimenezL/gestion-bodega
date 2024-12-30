import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número." },
        { status: 400 }
      );
    }

    const results = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [id]
    );

    if (results.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número." },
        { status: 400 }
      );
    }

    // Verificar si el producto existe antes de intentar eliminarlo
    const checkResult = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [productId]
    );

    if (checkResult.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar las referencias primero en la tabla relacionada (si las hay)
    await pool.query("DELETE FROM retiros_material WHERE id_material = ?", [
      productId,
    ]);

    // Proceder a eliminar el producto
    const results = await pool.query(
      "DELETE FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [productId]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se pudo eliminar el producto." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Producto eliminado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE INVENTARIO_MATERIAL SET nombre = ?, descripcion = ?, categoria = ?, cantidad = ?, unidad_medida = ?, precio_unitario = ? WHERE id = ?",
      [
        body.nombre,
        body.descripcion,
        body.categoria,
        body.cantidad,
        body.unidad_medida,
        body.precio_unitario,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se pudo actualizar el producto." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
