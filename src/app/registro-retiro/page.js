"use client";
import RetirosForm from "../../components/retirosForm/RetirosForm";
import withAuth from "../../components/withAuth";

function registroRetiro() {
  return (
    <div>
      <RetirosForm />
    </div>
  );
}

export default withAuth(registroRetiro);
