import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  id: number;
  phone: string;
  customers: string;
  customer_name: string;
}

interface CampaignTemplate {
  file_name: string;
  file_description: string;
  file_id: string;
  customers: Customer[];
}

interface IPhoneSelectorProps {
  onSelectPhones: (phones: string[]) => void;
}

export const PhoneSelector = (props: IPhoneSelectorProps) => {
  const { onSelectPhones } = props;
  const [data, setData] = useState<CampaignTemplate[]>([]);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]); // Store selected phone numbers
  const [selectedFile, setSelectedFile] = useState<string>(""); // Default selected file ID
  const [selectedFileName, setSelectedFileName] = useState<string>(""); // Store the name of the selected file

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CampaignTemplate[]>(
          "https://zaloapp.ongdev.online/api/v1/config"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    onSelectPhones(selectedPhones);
  }, [selectedPhones, onSelectPhones]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileId = event.target.value;
    setSelectedFile(fileId);

    const currentTemplate = data.find(
      (template) => template.file_id === fileId
    );
    if (currentTemplate) {
      const allPhoneNumbers = currentTemplate.customers.map(
        (customer) => customer.phone
      );
      setSelectedPhones(allPhoneNumbers);
      setSelectedFileName(currentTemplate.file_name);
    } else {
      setSelectedPhones([]);
      setSelectedFileName("");
    }
  };

  return (
    <div>
      <div className="mb-2 space-x-4">
        <label htmlFor="file-select" className="font-bold mb-2">
          Chọn tệp KH:
        </label>
        <select
          id="file-select"
          value={selectedFile}
          onChange={handleFileChange}
          className=" p-2 border border-gray-300"
        >
          <option value="">Lựa chọn tệp khách hàng</option>
          {data.map((template) => (
            <option key={template.file_id} value={template.file_id}>
              {template.file_name}
            </option>
          ))}
        </select>
      </div>

      {selectedFileName && (
        <div className="mt-4 ">
          Tệp khách hàng đã chọn:
          <span className="p-2 font-bold">{selectedFileName}</span>
        </div>
      )}
    </div>
  );
};

export default PhoneSelector;
