import { useEffect } from "react";
import { Medias } from "./Medias";

interface TImage {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
}

export const ImageDrawer = (prop: TImage) => {
  const { isOpen, onClose, onImageSelect } = prop;

  // Close the drawer when the user presses the "Escape" key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Don't render the drawer if it's closed

  return (
    <div className="fixed inset-0 flex items-start justify-end z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Close on overlay click
      />
      <div className="bg-white w-96 max-w-full h-full overflow-y-auto shadow-lg">
        <div className="p-2">
          <Medias onImageSelect={onImageSelect} />
        </div>
        <div className="flex justify-end p-2">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDrawer;
