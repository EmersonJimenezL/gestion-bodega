// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Obtener el token desde las cookies
  const url = req.nextUrl; // URL actual de la solicitud

  // Rutas protegidas (añade más según sea necesario)
  const protectedPaths = [
    "/vista-producto",
    "/vista-retiros",
    "/vista-trabajador",
    "/registro-producto",
    "/registro-trabajador",
    "/registro-retiro",
    "/inicio",
  ];

  // Verificar si la URL es una ruta protegida
  const isProtectedRoute = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    // Si intenta acceder a una ruta protegida sin token, redirigir al inicio de sesión
    const loginUrl = new URL("/inicio-sesion", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continuar normalmente si no es una ruta protegida o si el token existe
  return NextResponse.next();
}

// Configuración de las rutas donde se aplica el middleware
export const config = {
  matcher: [
    "/vista-producto/:path*",
    "/vista-retiros/:path*",
    "/vista-trabajador/:path*",
    "/registro-producto/:path*",
    "/registro-trabajador/:path*",
    "/registro-retiro/:path*",
    "/inicio/:path*",
  ], // Indica las rutas protegidas
};
