import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("obteniendo un producto");
}

export function DELETE() {
  return NextResponse.json("Eliminando producto");
}

export function PUT() {
  return NextResponse.json("Actualizando productos");
}
