"use client";
import ProductView from "../../components/productView/ProductView";
import withAuth from "../../components/withAuth";

function vistaProducto() {
  return (
    <div>
      <ProductView />
    </div>
  );
}

export default withAuth(vistaProducto);
