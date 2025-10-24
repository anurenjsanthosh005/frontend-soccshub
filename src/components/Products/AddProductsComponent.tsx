import React, { useEffect, useState } from "react";
import { addProducts, editProducts } from "../../api/productsApi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { productEditState, setEditProduct } from "../../features/products/productSlice";

type ProductImage = {
  id: number;
  image: string;
  alt_text?: string;
};

type ProductFormData = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  length?: number | string;
  discount?: number;
  is_active?: boolean;
  length_type?: string;
  category?: any;
};

function AddProductsComponent() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProductFormData>();
  const dispatch = useDispatch();
  const { productEdit, editingProduct } = useSelector((state: RootState) => state.productSlice);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editedFiles, setEditedFiles] = useState<ProductImage[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editingProduct) return;
    setValue("name", editingProduct.name);
    setValue("description", editingProduct.description || "");
    setValue("price", Number(editingProduct.price));
    setValue("stock", editingProduct.stock);
    setValue("length", editingProduct.length_type || "");
    setValue("discount", editingProduct.discount ? Number(editingProduct.discount) : 0);
    setValue("is_active", editingProduct.is_active || false);
    if (editingProduct.images?.length) {
      setEditedFiles(editingProduct.images);
      setPreviewImages(editingProduct.images.map((img) => img.image));
    }
  }, [editingProduct, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    if (index < editedFiles.length) {
      setEditedFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - editedFiles.length;
      setSelectedFiles((prev) => prev.filter((_, i) => i !== newIndex));
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
    //   setLoading(true);
      const formData = new FormData();
      formData.append("name", String(data.name));
      formData.append("description", String(data.description || ""));
      formData.append("price", String(data.price));
      formData.append("stock", String(data.stock));
      formData.append("length_type", String(data.length || ""));
      formData.append("discount", String(data.discount || 0));
      formData.append("is_active", data.is_active ? "true" : "false");
      selectedFiles.forEach((file) => formData.append("images", file));
      const existingImageIds = editedFiles.map((img) => img.id);
      existingImageIds.forEach((id) => formData.append("existing_images", id.toString()));

      let res;
      if (editingProduct) {
        res = await editProducts(editingProduct.id, formData);
      } else {
        res = await addProducts(formData);
        alert("Product added successfully!");
      }

      reset();
      setSelectedFiles([]);
      setEditedFiles([]);
      setPreviewImages([]);
      dispatch(productEditState(false));
      dispatch(setEditProduct(null));
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product");
    } finally {
    //   setLoading(false);
    }
  };

  const onClose = () => {
    reset();
    setSelectedFiles([]);
    setEditedFiles([]);
    setPreviewImages([]);
    dispatch(productEditState(false));
    dispatch(setEditProduct(null));
  };

  return (
    <div className="my-7 container w-full px-6 flex flex-col left-0">
      <div
        onClick={onClose}
        className={`text-lg font-bold flex justify-end ${productEdit ? "" : "hidden"}`}
      >
        <span className="text-xl md:text-2xl hover:scale-125 transition-transform cursor-pointer">
          x
        </span>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[12px] bg-white rounded-xl p-4">
        <div>
          <label className="block mb-1 font-medium">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded p-1"
            placeholder="Product name"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded p-1"
            placeholder="Product description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
            className="w-full border rounded p-1"
            placeholder="0.00"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Stock <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be positive" } })}
            className="w-full border rounded p-1"
            placeholder="0"
          />
          {errors.stock && <p className="text-red-500 text-xs">{errors.stock.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Length</label>
          <select {...register("length")} className="w-full border rounded p-1">
            <option value="">Select length</option>
            <option value="low_cut">Low Cut</option>
            <option value="ankle">Ankle</option>
            <option value="crew">Crew</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input
            type="number"
            step="0.01"
            {...register("discount", {
              min: { value: 0, message: "Min 0%" },
              max: { value: 100, message: "Max 100%" },
            })}
            className="w-full border rounded p-1"
            placeholder="0"
          />
          {errors.discount && <p className="text-red-500 text-xs">{errors.discount.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_active")} />
          <label>Active</label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-1"
          />
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {previewImages.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-[10px] rounded-full px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            type="button"
            className="bg-black text-white font-semibold p-1 rounded hover:bg-red-800 w-[100px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white font-semibold p-1 rounded hover:bg-slate-900 w-[100px]"
          >
            {editingProduct ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductsComponent;
