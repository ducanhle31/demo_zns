import { useState, useEffect } from 'react';
import { useCampaign } from '../hook/useCampaign'; 

interface CustomerData {
  id: number;
  phone: string;
  customers: string; 
  order_code: string;
  status: string;
}

const data: CustomerData[] = [
  { id: 1, phone: "84344480909", customers: "2559231188943244647", order_code: "PE010299485", status: "skipped" },
  { id: 2, phone: "84985614219", customers: "Nguyễn Tiến Đạt", order_code: "PE010299485", status: "skipped" }
];

interface CustomeSelectorProps {
  onSelectCustome: (customs: string[]) => void;
}

export const CustomerSelector = (props:CustomeSelectorProps) => {
  const { onSelectCustome } = props;
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { updateCustomers } = useCampaign();

  useEffect(() => {
    onSelectCustome(selectedCustomers);
  }, [selectedCustomers, onSelectCustome]);

  const handleSelectCustomer = (customer: string) => {
    setSelectedCustomers(prev => {
      const isSelected = prev.includes(customer);
      const updatedSelection = isSelected
        ? prev.filter(item => item !== customer)
        : [...prev, customer];
      updateCustomers(updatedSelection); 
      return updatedSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === data.length) {
      setSelectedCustomers([]);
      updateCustomers([]); 
    } else {
      const allCustomers = data.map(item => item.customers); 
      setSelectedCustomers(allCustomers);
      updateCustomers(allCustomers); 
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chọn khách hàng</h1>

      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedCustomers.length === data.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          Chọn tất cả
        </label>
      </div>

      <div>
        {data.map(item => (
          <div key={item.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCustomers.includes(item.customers)}
                onChange={() => handleSelectCustomer(item.customers)}
                className="mr-2"
              />
              {item.customers}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Khách hàng đã chọn:</h2>
        {selectedCustomers.length > 0 ? (
          <ul>
            {selectedCustomers.map((customer, index) => (
              <li key={index}>{customer}</li>
            ))}
          </ul>
        ) : (
          <p>Chưa có khách hàng nào được chọn.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerSelector;
