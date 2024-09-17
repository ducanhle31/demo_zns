import { useState } from 'react';
import { useCampaign } from '../hook/useCampaign'; // Import useCampaign to access Redux actions

interface CustomerData {
  id: number;
  customers: string;
}

export const CustomerSelector = () => {
  const data: CustomerData[] = [
    { id: 1, customers: "2559231188943244647" },
    { id: 2, customers: "2559231188943244647" }
  ];

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const { updateCustomer } = useCampaign();

  const handleSelectCustomer = (customer: string) => {
    setSelectedCustomer(customer);
    updateCustomer(customer); 
  };

  const handleSelectAll = () => {
    if (selectedCustomer) {
      setSelectedCustomer(null); 
      updateCustomer(''); 
    } else {
      const allCustomers = data[0].customers; 
      setSelectedCustomer(allCustomers);
      updateCustomer(allCustomers); 
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chọn khách hàng</h1>

      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedCustomer !== null}
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
                checked={selectedCustomer === item.customers}
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
        {selectedCustomer ? (
          <p>{selectedCustomer}</p>
        ) : (
          <p>Chưa có khách hàng nào được chọn.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerSelector;
