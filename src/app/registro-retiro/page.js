"use client";

import RetirosForm from "../../components/retirosForm/RetirosForm";
import withAuth from "../../components/withAuth";

function RegistroRetiro() {
  useSessionTimeout();
  return (
    <div>
      <RetirosForm />
    </div>
  );
}

export default withAuth(RegistroRetiro);
