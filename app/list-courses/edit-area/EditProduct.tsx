"use client";
import ImageDrawer from "@/app/components/admin/ImageDrawer";
import LayoutEditer from "@/app/components/admin/LayoutEditer";
import { useAppDispatch, useProducts } from "@/app/hook/useProducts";
import { useAuth } from "@/app/login/AuthContext";

import {
  setProduct,
  submitProductUpdateThunk,
  updateProductDescription,
} from "@/lib/redux/products.Slice";

import { useEffect, useState } from "react";

export const EditProduct = () => {
  const dispatch = useAppDispatch();
  const { products, selectedProductId, selectedProduct } = useProducts();
  const [desc, setDesc] = useState("");
  const [, setExistingImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [currentProductIndex, setCurrentProductIndex] = useState<number | null>(null);
  const { getToken } = useAuth();
  const token = getToken();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (selectedProductId !== null) {
      const product = selectedProduct;
      setDesc(product?.th_zalo_app_info?.desc || "");
      setImagePreview(product?.th_zalo_app_info?.image || "");
    }
  }, [selectedProduct, selectedProductId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProductId === null) return;

    const confirmUpdate = window.confirm("Bạn có chắc chắn muốn thay đổi không?");
    if (!confirmUpdate) return;

    if (!token) {
      console.error("Token is not available");
      return;
    }

    dispatch(
      submitProductUpdateThunk({
        token,
        productId: selectedProductId,
        desc,
        existingImageUrl: selectedProduct?.th_zalo_app_info?.image || "",
        file: null,
      })
    )
      .unwrap()
      .then(() => {
        alert("Thành công");
        setImagePreview("");
      })
      .catch((error) => {
        console.error(error);
        alert(`Error updating product: ${error}`);
      });
  };

  const handleImageDrawerOpen = (index: number) => {
    setCurrentProductIndex(index);
    onOpen();
  };

  const handleImageDrawerClose = () => {
    setCurrentProductIndex(null);
    onClose();
  };

  const handleImageSelect = (url: string) => {
    setExistingImageUrl(url);
    if (currentProductIndex !== null) {
      const productState = {
        ...products[currentProductIndex],
        th_zalo_app_info: {
          ...products[currentProductIndex].th_zalo_app_info,
          image: url,
        },
      };
      dispatch(setProduct(productState));
    }
    handleImageDrawerClose();
  };

  const handleDescriptionChange = (value: string) => {
    setDesc(value);
    if (selectedProductId !== null) {
      const productIndex = products.findIndex(
        (product) => product.id === selectedProductId
      );
      dispatch(updateProductDescription({ index: productIndex, desc: value }));
    }
  };

  if (selectedProductId === null) {
    return (
      <LayoutEditer w="384px">
        <p className="text-sm text-center">Hãy lựa chọn một sản phẩm</p>
      </LayoutEditer>
    );
  }

  return (
    <LayoutEditer w="384px">
      <form onSubmit={handleSubmit}>
        <div className="py-6 w-full flex items-start justify-center flex-row">
          <div className="mb-4 flex flex-col items-start">
            <p className="font-semibold w-[370px]">
              Tên sản phẩm: {selectedProduct?.name}
            </p>
            <img
              src={
                imagePreview ||
                selectedProduct?.th_zalo_app_info?.image ||
                "blog.jpeg"
              }
              alt={selectedProduct?.name || "Product Image"}
              className="cursor-pointer rounded-lg w-[300px] mb-4"
              onClick={() =>
                handleImageDrawerOpen(
                  products.findIndex((product) => product.id === selectedProductId)
                )
              }
            />

            <button
              onClick={() =>
                handleImageDrawerOpen(
                  products.findIndex((product) => product.id === selectedProductId)
                )
              }
              className="text-sm py-2 px-4 text-white bg-teal-500 rounded-md hover:bg-teal-600"
            >
              Chọn ảnh khác
            </button>
            <div className="mb-4 w-full text-left">
              <p className="pb-1">Description</p>
              <textarea
                className="resize-vertical w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter description"
                value={desc}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleDescriptionChange(e.target.value)
                }
              />
            </div>
            <button
              type="submit"
              className="text-sm py-2 px-4 text-white bg-teal-500 rounded-md hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <ImageDrawer
        isOpen={isOpen}
        onClose={handleImageDrawerClose}
        onImageSelect={handleImageSelect}
      />
    </LayoutEditer>
  );
};export default EditProduct;
