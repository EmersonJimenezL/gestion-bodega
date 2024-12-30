"use client";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";
import FloatingButtons from "@/components/principal/home";

function Inicio() {
  useSessionTimeout();
  return (
    <div>
      <FloatingButtons />
    </div>
  );
}

export default withAuth(Inicio);
