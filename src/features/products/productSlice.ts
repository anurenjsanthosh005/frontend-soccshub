import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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

export interface ProductState {
  productEdit : boolean
  editingProduct: ProductData | null; 
}

const initialState: ProductState = {
    productEdit: false,
    editingProduct : null
}

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    productEditState: (state,action:PayloadAction<boolean>) => {
      state.productEdit = action.payload
    },
    setEditProduct: (state,action:PayloadAction<ProductData | null>) => {
      state.editingProduct = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { productEditState,setEditProduct } = productSlice.actions

export default productSlice.reducer