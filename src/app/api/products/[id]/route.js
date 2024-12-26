import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    // Validar que params.id sea un número
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Validar que params.id sea un número
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número." },
        { status: 400 }
      );
    }

    // Verificar si el producto existe antes de intentar eliminarlo
    const checkResult = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [id]
    );

    if (checkResult.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Proceder a eliminar el producto
    const results = await pool.query(
      "DELETE FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [id]
    );

    // Agregar más depuración para verificar los resultados de la eliminación
    console.log("Resultados de DELETE:", results);

    // Verificar si se eliminó algún producto
    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se pudo eliminar el producto." },
        { status: 500 }
      );
    }

    // Confirmación de eliminación exitosa
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Validar que params.id sea un número
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número." },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Validar campos en el objeto `data`
    const {
      nombre,
      descripcion,
      categoria,
      cantidad,
      unidad_medida,
      precio_unitario,
    } = data;
    if (
      !nombre ||
      !categoria ||
      !cantidad ||
      !unidad_medida ||
      !precio_unitario ||
      typeof nombre !== "string" ||
      typeof categoria !== "string" ||
      typeof unidad_medida !== "string" ||
      typeof cantidad !== "number" ||
      typeof precio_unitario !== "number" ||
      cantidad < 0 ||
      precio_unitario < 0
    ) {
      return NextResponse.json(
        { message: "Datos inválidos o incompletos." },
        { status: 400 }
      );
    }

    const results = await pool.query(
      "UPDATE inventario_material SET ? WHERE ID = ?",
      [data, id]
    );

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await pool.query(
      "SELECT * FROM INVENTARIO_MATERIAL WHERE ID = ?",
      [id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
