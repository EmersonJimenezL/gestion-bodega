"use client";
<<<<<<< HEAD
import RetirosForm from "../../components/retirosForm/RetirosForm";
import withAuth from "../../components/withAuth";

function registroRetiro() {
  return (
    <div>
      <RetirosForm />
=======
import RetiroForm from "../../components/retiroForm/RetiroForm";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";

function RegistroRetiro() {
  useSessionTimeout();
  return (
    <div>
      <RetiroForm />
>>>>>>> 4f057c0f767374449cd317203d1b32042dff7348
    </div>
  );
}

<<<<<<< HEAD
export default withAuth(registroRetiro);
=======
export default withAuth(RegistroRetiro);
>>>>>>> 4f057c0f767374449cd317203d1b32042dff7348
