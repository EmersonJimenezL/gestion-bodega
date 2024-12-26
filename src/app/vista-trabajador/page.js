"use client";
import TrabajadorView from "../../components/trabajadorView/TrabajadorView";
import withAuth from "../../components/withAuth";

function vistaTrabajador() {
  return (
    <div>
      <TrabajadorView />
    </div>
  );
}

export default withAuth(vistaTrabajador);
