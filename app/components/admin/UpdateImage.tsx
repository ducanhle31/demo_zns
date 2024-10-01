import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useAuth } from "@/app/login/AuthContext";
import { toast } from "react-toastify";

const API_URL = "https://zaloapp.ongdev.online ";

export const ImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { getToken } = useAuth();

  const onCopy = () => {
    navigator.clipboard.writeText(fileNames.join(", ") || "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const previewURLs = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previewURLs]);
      setFileNames((prevFileNames) => [
        ...prevFileNames,
        ...selectedFiles.map((file) => file.name),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFileNames = fileNames.filter((_, i) => i !== index);

    setFiles(newFiles);
    setImagePreviews(newPreviews);
    setFileNames(newFileNames);
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;

    const confirmSubmit = window.confirm(
      "Bạn có chắc chắn muốn tải ảnh không?"
    );
    if (!confirmSubmit) return;

    const token = getToken();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await fetch(`${API_URL}/api/v1/medias/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      toast.success(
        <div className="flex items-center">
          <span>{fileNames.join(", ")}</span>
          <button
            onClick={onCopy}
            className="ml-2 text-teal-500 hover:underline"
            aria-label="Copy file names"
          >
            <MdContentCopy />
          </button>
        </div>,
        {
          autoClose: 3000,
          closeOnClick: true,
          position: "top-right",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error(`Failed to upload images: ${fileNames.join(", ")}`, {
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="p-4 max-w-xs mb-10 border border-gray-300 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Thêm ảnh</h4>
      <label htmlFor="file-input" className="block cursor-pointer border-2 border-dashed border-gray-400 rounded-md p-2 mb-4 text-center">
        <span>Click to select images</span>
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/svg+xml, image/webp"
        multiple // Allow multiple file uploads
        aria-label="Select images"
      />
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative text-center">
              <img
                src={preview}
                alt={`Selected image ${index + 1}`}
                className="object-cover mx-auto h-24 mb-2"
              />
              <button
                className="absolute top-0 right-0 text-red-500"
                onClick={() => handleRemoveImage(index)}
                aria-label="Remove image"
              >
                ×
              </button>
              <p className="mt-2 text-sm text-gray-500">{fileNames[index]}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
      >
        Submit
      </button>
    </div>
  );
};