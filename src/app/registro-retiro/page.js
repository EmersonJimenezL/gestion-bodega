"use client";
import RetiroForm from "../../components/retiroForm/RetiroForm";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";

function RegistroRetiro() {
  useSessionTimeout();
  return (
    <div>
      <RetiroForm />
    </div>
  );
}

export default withAuth(RegistroRetiro);
