"use client";
import TrabajadorForm from "../../components/trabajadorForm/TrabajadorForm";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";

function RegistroTrabajador() {
  useSessionTimeout();
  return (
    <div>
      <TrabajadorForm />
    </div>
  );
}

export default withAuth(RegistroTrabajador);
