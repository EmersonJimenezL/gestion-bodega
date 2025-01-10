"use client";
import RetirosForm from "../../components/retirosForm/RetirosForm";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";

function RegistroRetiro() {
  useSessionTimeout();
  return (
    <div>
      <RetirosForm />
    </div>
  );
}

export default withAuth(RegistroRetiro);
