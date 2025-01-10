import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  const results = await pool.query("SELECT * FROM RETIROS_MATERIAL");
  console.log(results);
  return NextResponse.json(results);
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

    if (!material) {
      return NextResponse.json(
        { message: "Material no encontrado" },
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
}

// Funciones ficticias para obtener y actualizar materiales
async function getMaterialById(id) {
  // Aquí deberías obtener el material desde tu base de datos
  return { id, nombre: "Producto 1", cantidad: 10 }; // Ejemplo
}

async function updateInventory(id, cantidad) {
  // Aquí deberías actualizar la base de datos con el retiro
  console.log(`Actualizando inventario: material ${id}, cantidad ${cantidad}`);
}
