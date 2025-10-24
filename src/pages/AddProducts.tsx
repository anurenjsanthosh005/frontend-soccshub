import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addProducts } from "../api/productsApi";
import AddProductsComponent from "../components/Products/AddProductsComponent";

function AddProducts() {
  return (
    <div>
      <AddProductsComponent />
    </div>
  );
}

export default AddProducts;
