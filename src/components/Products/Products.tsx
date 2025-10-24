import { useDispatch } from "react-redux";
import {
  productEditState,
  setEditProduct,
} from "../../features/products/productSlice";

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
  const onEdit = (data: ProductData) => {
    dispatch(productEditState(true));
    dispatch(setEditProduct(data));
    // console.log("data :",data);
  };

  return (
    <>
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
    </>
  );
}

export default Product;
