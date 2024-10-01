"use client";
import { useAppDispatch, useProducts } from "@/app/hook/useProducts";
import { useAuth } from "@/app/login/AuthContext";
import {
  setProduct,
  updateProductDescription,
} from "@/lib/redux/products.Slice";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { utils } from "xlsx";

interface Product {
  id: number;
  image: string;
  desc: string;
  title: string;
  path: string;
  file: File | string | null;
}

interface ImportProps {
  onImport?: (data: Product[]) => void;
}

const API_URL = "https://zaloapp.ongdev.online/api/v1";

const Import = ({ onImport }: ImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { products } = useProducts();
  const [productsToUpdate, setProductsToUpdate] = useState<Product[]>([]);
  const [imported, setImported] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { getToken } = useAuth();

  const handleImportFromExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const binaryStr = event.target.result as string;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<Product>(worksheet);

        const updates = data
          .map((row: Product) => {
            const { id, desc, image } = row;
            const productIndex = products.findIndex(
              (product) => product.id === id
            );
            if (productIndex !== -1) {
              dispatch(updateProductDescription({ index: productIndex, desc }));
              const updatedProduct = {
                ...products[productIndex],
                th_zalo_app_info: {
                  ...products[productIndex].th_zalo_app_info,
                  desc,
                  image,
                },
              };
              dispatch(setProduct(updatedProduct));
              return updatedProduct;
            }
            return null;
          })
          .filter((product) => product !== null);

        setProductsToUpdate(updates as unknown as Product[]);
        setImported(true);

        if (onImport) {
          onImport(data);
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (productsToUpdate.length > 0) {
      setIsLoading(true);
      const token = getToken();
      console.log("Token:", token);

      try {
        const response = await fetch(`${API_URL}/products`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productsToUpdate),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Failed to update products:", errorData);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const results = await response.json();
        setAlertType("success");
        setAlertMessage("Dữ liệu đã được cập nhật!");
        console.log("Results:", results);
      } catch (error) {
        console.error("Error during fetch:", error);
        setAlertType("error");
        setAlertMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No products to update");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-teal-500 text-white text-sm px-4 py-2 rounded mr-2"
      >
        Import sản phẩm
      </button>
      <label htmlFor="fileInput" className="sr-only">Import Excel File</label>
      <input
        id="fileInput"
        type="file"
        accept=".xlsx, .xls"
        multiple
        ref={fileInputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.[0]) {
            handleImportFromExcel(e.target.files[0]);
          }
        }}
        className="hidden"
        aria-label="Import Excel File"
      />
      <button
        onClick={handleSubmit}
        className={`bg-teal-500 text-white text-sm px-4 py-2 rounded ${
          !imported ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!imported}
      >
        Xuất bản
      </button>

      {/* Alert for success or error */}
      {alertType && (
        <div
          className={`p-4 mt-4 rounded ${
            alertType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          <strong>{alertType === "success" ? "Success!" : "Error!"}</strong>
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Loading spinner */}
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <div className="loader">Loading...</div> {/* Add your spinner here */}
        </div>
      )}
    </div>
  );
};
export default Import;

export const ExportToExcel: React.FC = () => {
  const { products } = useProducts();

  const handleExportToExcel = () => {
    const data = products.map((product) => ({
      id: product.id,
      name: product.name,
      desc: product.th_zalo_app_info?.desc,
      image: product.th_zalo_app_info?.image || "No Image",
    }));

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <button
      onClick={handleExportToExcel}
      className="bg-teal-500 text-white text-sm px-4 py-2 rounded ml-2"
    >
      Export Sản Phẩm
    </button>
  );
};
