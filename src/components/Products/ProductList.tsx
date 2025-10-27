import React, { useCallback, useEffect, useState } from "react";
import { deleteProducts, getProducts } from "../../api/productsApi";
import { useLocation, useNavigate } from "react-router-dom";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import AddProductsComponent from "./AddProductsComponent";
import { setProductLocation } from "../../features/products/productSlice";

type ProductImage = {
  id: number;
  image: string;
  alt_text?: string;
};

type ProductData = {
  id: number;
  name: string;
  description?: string;
  price: string; // matches API
  stock: number;
  length?: number | string;
  discount?: string;
  is_active?: boolean;
  images?: ProductImage[];
  length_type?: string;
  category?: any;
};

function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [products, setProducts] = useState<ProductData[]>([]);
  
  const { productEdit } = useSelector((state: RootState) => state.productSlice);
  const isActiveHash = (hash: string) => location.hash === hash;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getProducts();
      //   console.log("get products data :", res);
      setProducts(res);
      console.log("products length :", res.length);
      console.log("products  :", res);
    } catch (err) {
      setIsLoading(false);

      //   console.log("get products error :", err);
    }
    setIsLoading(false);
  }, []);

  const onDelete = async (id: number) => {
    try {
      await deleteProducts(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    if (isActiveHash("#product")) {
      dispatch(setProductLocation(true));
      navigate("#addproduct");
    } else {
      dispatch(setProductLocation(false));
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (productEdit === true) {
      fetchProducts();
    }
  }, [productEdit]);

  return (
    <>
      {productEdit ? (
        <AddProductsComponent />
      ) : (
        <>
          {isLoading ? (
            <div className="w-full">loading ...</div>
          ) : (
            <div className="w-full">
              {products && products.length > 0 ? (
                products.map((p, index) => (
                  <Products
                    key={p.id}
                    data={p}
                    index={index}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <p
                  onClick={() => navigate("/add-products")}
                  className="mt-5 mx-4 font-medium cursor-pointer hover:text-blue-500"
                >
                  Add products . . .
                </p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProductList;
