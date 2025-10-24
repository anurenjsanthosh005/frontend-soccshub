import { getProducts } from "../api/productsApi";

export const fetchAllProducts = async () => {
  try {
    const res = await getProducts();
    return res.data; // or res depending on your axios response structure
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
};
