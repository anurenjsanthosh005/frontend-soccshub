import React from "react";
import ProductList from "../components/Products/ProductList";

function ListProducts() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="font-bold">Added Products</h1>
      <ProductList />
    </div>
  );
}

export default ListProducts;
