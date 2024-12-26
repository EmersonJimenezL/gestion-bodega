"use client";
import ProductForm from "../../components/productForm/ProductForm";
import withAuth from "../../components/withAuth";

function RegistroProducto() {
  return (
    <div>
      <ProductForm />
    </div>
  );
}

export default withAuth(RegistroProducto);
