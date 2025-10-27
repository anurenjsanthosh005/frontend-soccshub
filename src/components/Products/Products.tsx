import { useDispatch, useSelector } from "react-redux";
import {
  productEditState,
  setEditProduct,
} from "../../features/products/productSlice";
import type { RootState } from "../../app/store";

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

type Props = {
  data: ProductData;
  index: number;
  onDelete: (id: number) => void;
};

function Product({ data, index, onDelete }: Props) {
  const dispatch = useDispatch();
  const { productCardLocation } = useSelector(
    (state: RootState) => state.productSlice
  );
  const onEdit = (data: ProductData) => {
    dispatch(productEditState(true));
    dispatch(setEditProduct(data));
    // console.log("data :",data);
  };

  return (
    <>
      {!productCardLocation ? (
        <div className="w-full border rounded-lg shadow px-2 py-3 flex flex-col items-start gap-1 my-4 bg-blue-50 ">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-2 bg-blue-200 h-[30px] px-1 rounded">
            <h3 className=" font-bold flex gap-3">
              <span className="text-blue-900">{index + 1}.</span>
              <span className=""> {data.name}</span>
            </h3>
            <div className="flex gap-2 text-[11px]">
              <button
                onClick={() => onEdit && onEdit(data)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(data.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex w-full gap-2">
            {/* Image */}
            <div className="w-17 h-17 flex-shrink-0">
              {data.images && data.images.length > 0 ? (
                <img
                  src={data.images[0].image}
                  alt={data.name}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full text-[10px] bg-blue-300 flex items-center justify-center rounded border">
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col text-[12px] ">
              <p className="font-semibold">Price: ${data.price}</p>
              <p className="font-semibold">Stock: {data.stock}</p>
              {data.description && (
                <p className="text-gray-600">{data.description}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full border rounded-lg shadow px-3 py-3 flex flex-col items-start gap-2 my-3 bg-white hover:shadow-lg transition-shadow duration-200">
          {/* Product header */}
          <div className="w-full flex justify-between items-center mb-2 border-b pb-1">
            <h3 className="font-semibold text-blue-800">{data.name}</h3>
            <p className="text-sm text-gray-500">₹{data.price}</p>
          </div>

          {/* Product image */}
          <div className="w-full flex justify-center">
            {data.images && data.images.length > 0 ? (
              <img
                src={data.images[0].image}
                alt={data.name}
                className="w-32 h-32 object-cover rounded-md border"
                loading="lazy"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center text-xs bg-gray-100 text-gray-500 rounded-md border">
                No Image
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col text-sm mt-2 gap-1 w-full">
            <p>
              <span className="font-medium">Stock:</span> {data.stock}
            </p>
            {data.description && (
              <p className="text-gray-600 line-clamp-2">{data.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-3 w-full">
            <button
              onClick={() => onEdit && onEdit(data)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(data.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
