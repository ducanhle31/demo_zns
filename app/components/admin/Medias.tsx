import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { ImageUpload } from "./UpdateImage";

interface MediasProps {
  onImageSelect: (url: string) => void;
}

interface FileStructure {
  [key: string]: string[];
}

const API_URL = "https://zaloapp.ongdev.online";
const API_URL_A = "https://zaloapp.ongdev.online/api/v1";

export const Medias = (props: MediasProps) => {
  const { onImageSelect } = props;
  const [filesByDate, setFilesByDate] = useState<FileStructure>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${API_URL_A}/medias/uploads`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: FileStructure = await response.json();

        const formattedData = Object.keys(data).reduce((acc, date) => {
          acc[date] = data[date].map((file) => file.replace(/\\/g, "/"));
          return acc;
        }, {} as FileStructure);

        setFilesByDate(formattedData);

        const initialExpandedSections = Object.keys(formattedData).reduce(
          (acc, date) => {
            acc[date] = false;
            return acc;
          },
          {} as { [key: string]: boolean }
        );
        setExpandedSections(initialExpandedSections);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load images. Please try again later.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleConfirmSelection = () => {
    if (selectedImage && onImageSelect) {
      onImageSelect(selectedImage);
    }
  };

  const toggleSection = (date: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  const filteredFilesByDate = Object.keys(filesByDate).reduce((acc, date) => {
    const filteredFiles = filesByDate[date].filter((file) =>
      file.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredFiles.length > 0) {
      acc[date] = filteredFiles;
    }
    return acc;
  }, {} as FileStructure);

  return (
    <div>
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 h-10 py-2">
        <h1 className="text-xl font-semibold mb-2">Kho ảnh đã tải lên</h1>
        <input
          type="text"
          placeholder="Tìm kiếm ảnh..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="max-w-[300px] p-2 border rounded"
        />
        {selectedImage && (
          <button
            className="mr-2 bg-teal-500 text-white px-4 py-2 rounded text-sm"
            onClick={handleConfirmSelection}
          >
            Lựa chọn
          </button>
        )}
      </div>
      <ImageUpload />
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        Object.keys(filteredFilesByDate).map((date) => (
          <div className="space-y-4" key={date}>
            <div className="flex items-center">
              <span className="text-md font-bold flex-1">{date}</span>
              <button
                aria-label={expandedSections[date] ? "Collapse section" : "Expand section"}
                onClick={() => toggleSection(date)}
                className="text-xl"
              >
                {expandedSections[date] ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
              </button>
            </div>
            {expandedSections[date] && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {filteredFilesByDate[date].map((file, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden relative cursor-pointer ${
                      selectedImage === `${API_URL}/uploads/${file}` ? "border-2 border-teal-500" : ""
                    }`}
                    onClick={() => handleImageClick(`${API_URL}/uploads/${file}`)}
                  >
                    <img
                      src={`${API_URL}/uploads/${file}`}
                      alt={file.split("/").pop()?.replace(/\.\w+$/, "") || `Image ${index}`}
                      className="rounded-lg h-[142px] w-[142px] object-contain"
                    />
                    {selectedImage === `${API_URL}/uploads/${file}` && (
                      <div className="absolute top-2 right-2 bg-teal-500 rounded-full p-1 text-white">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
