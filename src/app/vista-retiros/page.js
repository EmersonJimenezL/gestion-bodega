"use client";
import RetirosView from "../../components/retirosView/RetirosView";
import withAuth from "../../components/withAuth";

function vistaRetiro() {
  return (
    <div>
      <RetirosView />
    </div>
  );
}

export default withAuth(vistaRetiro);
