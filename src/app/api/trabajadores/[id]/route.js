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
    if (!params.id || isNaN(params.id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número válido." },
        { status: 400 }
      );
    }

    const results = await pool.query("DELETE FROM EMPLEADOS WHERE ID = ?", [
      params.id,
    ]);

    if (results.affectedRows === 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Empleado eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Validar que params.id sea un número válido
    if (!params.id || isNaN(params.id)) {
      return NextResponse.json(
        { message: "ID inválido. Debe ser un número válido." },
        { status: 400 }
      );
    }

    // Obtener los datos enviados en la solicitud
    const data = await request.json();

    // Validar que todos los campos requeridos estén presentes
    if (
      !data.rut ||
      !data.nombre ||
      !data.apellido_paterno ||
      !data.apellido_materno ||
      !data.area_trabajo ||
      !data.cargo
    ) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Eliminar el campo `fecha_registro` del objeto de datos
    const { fecha_registro, ...dataSinFecha } = data;

    // Actualizar el empleado
    const results = await pool.query(
      "UPDATE EMPLEADOS SET rut = ?, nombre = ?, apellido_paterno = ?, apellido_materno = ?, area_trabajo = ?, cargo = ?, fecha_registro = NOW() WHERE ID = ?",
      [
        dataSinFecha.rut,
        dataSinFecha.nombre,
        dataSinFecha.apellido_paterno,
        dataSinFecha.apellido_materno,
        dataSinFecha.area_trabajo,
        dataSinFecha.cargo,
        params.id,
      ]
    );

    // Verificar si se encontró el empleado para actualizar
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

    // Respuesta exitosa con el empleado actualizado
    return NextResponse.json({
      message: "Empleado actualizado exitosamente",
      empleado: updatedEmpleado[0],
    });
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
