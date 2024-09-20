import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  customers: string;
}

interface CampaignTemplate {
  file_name: string;
  file_description: string;
  file_id: string;
  customers: Customer[];
}

interface ICustomerSelectorProps {
  onSelectCustomers: (customers: string[]) => void;
}

export const CustomerSelector = (props: ICustomerSelectorProps) => {
  const { onSelectCustomers } = props;
  const [data, setData] = useState<CampaignTemplate[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CampaignTemplate[]>(
          "http://10.10.51.16:3001/api/v1/config"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    onSelectCustomers(selectedCustomers);
  }, [selectedCustomers, onSelectCustomers]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileId = event.target.value;
    setSelectedFile(fileId);

    const currentTemplate = data.find(
      (template) => template.file_id === fileId
    );
    if (currentTemplate) {
      const allCustomerNames = currentTemplate.customers.map(
        (customer) => customer.customers
      );
      setSelectedCustomers(allCustomerNames);
      setSelectedFileName(currentTemplate.file_name);
    } else {
      setSelectedCustomers([]);
      setSelectedFileName("");
    }
  };

  return (
    <div>
      <div className="mb-6 space-x-4">
        <label htmlFor="file-select" className="font-bold mb-2">
          Chọn tệp KH:
        </label>
        <select
          id="file-select"
          value={selectedFile}
          onChange={handleFileChange}
          className="p-2 border border-gray-300"
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
          <span className="border border-gray-300 p-2 rounded font-bold">
            {selectedFileName}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomerSelector;
