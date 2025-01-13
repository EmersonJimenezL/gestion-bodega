import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  try {
    // Realizar la consulta uniendo las tres tablas: retiros_material, empleados e inventario_material
    const results = await pool.query(`
      SELECT 
        r.id AS id_retiro,
        r.id_material,
        r.id_empleado,
        r.cantidad,
        r.fecha_retiro,
        e.nombre AS nombre_empleado,
        m.nombre AS nombre_material
      FROM retiros_material r
      JOIN empleados e ON r.id_empleado = e.id
      JOIN inventario_material m ON r.id_material = m.id
    `);

    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json(
      { message: "Error al obtener los datos." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { id_material, id_empleado, cantidad } = await req.json();

    // Verificar que los campos no estén vacíos
    if (!id_material || !id_empleado || !cantidad) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Aquí deberías procesar el retiro, por ejemplo, verificar el inventario
    const material = await getMaterialById(id_material); // Reemplaza con tu lógica para obtener el material
    const empleado = await getEmpleadoById(id_empleado); // Reemplaza con tu lógica para obtener el empleado

    if (!material) {
      return NextResponse.json(
        { message: "Material no encontrado" },
        { status: 404 }
      );
    }

    if (!empleado) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si hay suficiente material en el inventario
    if (material.cantidad < cantidad) {
      return NextResponse.json(
        { message: "No hay suficiente material en el inventario." },
        { status: 400 }
      );
    }

    // Lógica para registrar el retiro (ejemplo de actualización en la base de datos)
    await updateInventory(id_material, -cantidad); // Actualizar el inventario con el retiro

    // Responder con un mensaje de éxito
    return NextResponse.json(
      { message: "Retiro registrado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { message: "Error al registrar el retiro" },
      { status: 500 }
    );
  }

  // Funciones ficticias para obtener y actualizar materiales
  async function getMaterialById(id) {
    const [result] = await pool.query(
      "SELECT * FROM inventario_material WHERE id = ?",
      [id]
    );
    return result[0]; // Devuelve el primer resultado (material encontrado)
  }

  async function getEmpleadoById(id) {
    const [result] = await pool.query("SELECT * FROM empleados WHERE id = ?", [
      id,
    ]);
    return result[0]; // Devuelve el primer resultado (empleado encontrado)
  }

  async function updateInventory(id, cantidad) {
    // Aquí deberías actualizar la base de datos con el retiro
    console.log(
      `Actualizando inventario: material ${id}, cantidad ${cantidad}`
    );
    await pool.query(
      "UPDATE inventario_material SET cantidad = cantidad + ? WHERE id = ?",
      [cantidad, id]
    );
  }
}
