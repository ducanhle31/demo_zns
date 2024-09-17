import { useState } from 'react';
import { useCampaign } from '../hook/useCampaign'; 

interface CustomerData {
  id: number;
  phone: string;
  customers: string; 
  order_code: string;
}

interface CustomeSelectorProps {
  onSelectCustome: (customs: string[]) => void;
}

export const CustomerSelector = ({ onSelectCustome }: CustomeSelectorProps) => {
  const data: CustomerData[] = [
    { id: 1, phone: "84344480909", customers: "2559231188943244647", order_code: "PE010299485" },
    { id: 2, phone: "84985614219", customers: "Nguyễn Tiến Đạt", order_code: "PE010299485" }
  ];

  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const { updateCustomers } = useCampaign();

  const handleSelectCustomer = (customer: string) => {
    setSelectedCustomers(prev => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(customer)) {
        updatedSelection.delete(customer);
      } else {
        updatedSelection.add(customer);
      }
      const updatedCustomersArray = Array.from(updatedSelection);
      updateCustomers(updatedCustomersArray);
      onSelectCustome(updatedCustomersArray);
      return updatedSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedCustomers.size === data.length) {
      setSelectedCustomers(new Set());
      updateCustomers([]); 
      onSelectCustome([]); 
    } else {
      const allCustomers = data.map(item => item.customers);
      const allCustomerSet = new Set(allCustomers);
      setSelectedCustomers(allCustomerSet);
      updateCustomers(Array.from(allCustomerSet));
      onSelectCustome(allCustomers);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chọn khách hàng</h1>

      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedCustomers.size === data.length}
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
                checked={selectedCustomers.has(item.customers)}
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
        {selectedCustomers.size > 0 ? (
          <ul>
            {Array.from(selectedCustomers).map((customer, index) => (
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
