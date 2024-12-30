"use client";
import ProductForm from "../../components/productForm/ProductForm";
import withAuth from "../../components/withAuth";
import { useSessionTimeout } from "@/middleware/auth";

function RegistroProducto() {
  useSessionTimeout();
  return (
    <div>
      <ProductForm />
    </div>
  );
}

export default withAuth(RegistroProducto);
