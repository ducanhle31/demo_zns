"use client";
import ImageDrawer from "@/app/components/admin/ImageDrawer";
import { useAppDispatch, useBanners } from "@/app/hook/useBanners";
import { useAuth } from "@/app/login/AuthContext";
import {
  fetchCategoriesThunk,
  setBanner,
  TBanner,
} from "@/lib/redux/banners.Slice";

import { useEffect, useState } from "react";

const API_URL = "https://zaloapp.ongdev.online/api/v1";

export const EditBanners = () => {
  const { selectedBanner, categories } = useBanners();
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<TBanner | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [bannerName, setBannerName] = useState<string>(""); // New state for the banner name
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();

  useEffect(() => {
    if (selectedBanner) {
      setCurrentBanner(selectedBanner);
      setBannerName(selectedBanner.label || ""); // Set the initial banner name if it exists
    }
  }, [selectedBanner]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleImageDrawerOpen = (banner: TBanner) => {
    setCurrentBanner(banner);
    setIsImageDrawerOpen(true);
  };

  const handleImageDrawerClose = () => {
    setIsImageDrawerOpen(false);
  };

  const handleImageSelect = (url: string) => {
    if (currentBanner) {
      const updatedBanner = {
        ...currentBanner,
        thumbnail: url,
      };
      dispatch(setBanner(updatedBanner));
      setCurrentBanner(updatedBanner);
    }
    handleImageDrawerClose();
  };

  const handleSubmit = async () => {
    if (!currentBanner || !selectedCategoryId) {
      alert("Please select a category and an image.");
      return;
    }

    const bannerId = currentBanner.id;
    if (!bannerId) {
      alert("Banner ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("label", bannerName); // Using bannerName state
    formData.append("thumbnail", currentBanner.thumbnail || "");
    formData.append("category_id", selectedCategoryId);

    const token = getToken();

    try {
      const response = await fetch(`${API_URL}/banner/${bannerId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      alert("Banner updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating banner");
    }
  };

  const handleCreateBanner = async () => {
    if (!currentBanner || !selectedCategoryId || !bannerName) {
      alert("Hãy chọn Image, chuyên mục và nhập tên banner");
      return;
    }

    const formData = new FormData();
    formData.append("label", bannerName); // Using bannerName state
    formData.append("thumbnail", currentBanner.thumbnail || "");
    formData.append("category_id", selectedCategoryId);

    const token = getToken();

    try {
      const response = await fetch(`${API_URL}/banner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create banner");
      }

      alert("Banner created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating banner");
    }
  };

  const handleDelete = async () => {
    if (!currentBanner) {
      alert("No banner selected for deletion.");
      return;
    }

    const bannerId = currentBanner.id;
    if (!bannerId) {
      alert("Banner ID is missing.");
      return;
    }

    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa banner này không?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/banner/${bannerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      alert("Banner deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting banner");
    }
  };

  if (!currentBanner) return null;

  return (
    <div className="bg-white p-4 rounded-md flex flex-col items-center">
      <div className="w-full flex flex-col">
        <div className="border-b border-gray-300 py-6 flex justify-between items-start">
          <img
            src={currentBanner.thumbnail || "blog.jpeg"}
            alt="Editing image"
            className="rounded-md w-72 h-52 object-cover cursor-pointer"
            onClick={() => handleImageDrawerOpen(currentBanner)}
          />
          <div className="flex flex-col items-start space-y-4">
            <label className="font-medium">Tên Banner:</label>
            <input
              type="text"
              value={bannerName} // Binding banner name to input field
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBannerName(e.target.value)
              } // Updating state
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter banner name"
            />
            <button
              className="bg-teal-500 text-white text-sm py-2 px-4 rounded hover:bg-teal-600"
              onClick={() => handleImageDrawerOpen(currentBanner)}
            >
              Chọn ảnh khác
            </button>

            <select
              className="border border-teal-500 rounded-md p-2 w-full"
              value={selectedCategory || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedCategoryName = e.target.value;
                const selectedId =
                  categories
                    .flatMap((category) => [
                      category,
                      ...category.categories_child,
                    ])
                    .find((category) => category.name === selectedCategoryName)
                    ?.id || "";

                if (
                  window.confirm(
                    `Bạn có chắc chắn chọn danh mục ${selectedCategoryName} không?`
                  )
                ) {
                  setSelectedCategory(selectedCategoryName);
                  setSelectedCategoryId(selectedId.toString());
                }
              }}
              title="Select Category"
            >
              <option value="">Chọn danh mục</option>
              {categories?.map((category) => (
                <optgroup
                  key={category.id}
                  label={category.name}
                  className="bg-teal-500"
                >
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                  {category.categories_child.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.name}>
                      {subCategory.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="text-center">
              Danh mục đã chọn:
              {Array.isArray(currentBanner.category_id)
                ? currentBanner.category_id[1]
                : "Không có danh mục"}
            </span>
          </div>
        </div>
        <button
          className="bg-teal-500 text-white mt-4 py-2 px-4 rounded hover:bg-teal-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-red-500 text-white mt-2 py-2 px-4 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete Banner
        </button>
        <button
          className="bg-blue-500 text-white mt-2 py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleCreateBanner}
        >
          Tạo banner
        </button>
      </div>
      <ImageDrawer
        isOpen={isImageDrawerOpen}
        onClose={handleImageDrawerClose}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};
