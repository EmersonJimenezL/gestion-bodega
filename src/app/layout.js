// src/app/layout.js

import "./globals.css";
import { Inter } from "next/font/google";
import LogoutButton from "@/components/logoutButton/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gestion Bodega",
  description: "Gestion de inventarios y retiros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <LogoutButton />
      </body>
    </html>
  );
}
