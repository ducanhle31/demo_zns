import { useState, useEffect } from 'react';

interface CustomerData {
  id: number;
  phone: string;
  customers: string;
  order_code: string;
}

const initialData: CustomerData[] = [
  { id: 1, phone: "84344480909", customers: "2559231188943244647", order_code: "PE010299485", },
  { id: 2, phone: "84985614219", customers: "7005047623821262293", order_code: "PE010299485",  }
];

interface CustomeSelectorProps {
  onSelectCustome: (customers: string[]) => void;
}

export const CustomerSelector = ({ onSelectCustome }: CustomeSelectorProps) => {
  const [data] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  useEffect(() => {
    const selectedCustomers = data
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.customers);
    onSelectCustome(selectedCustomers);
  }, [selectedIds, data, onSelectCustome]);

  const handleSelectCustomer = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chọn khách hàng</h1>

      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedIds.length === data.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          Chọn tất cả
        </label>
      </div>

      <div>
        {data.map((item) => (
          <div key={item.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelectCustomer(item.id)}
                className="mr-2"
              />
              {item.customers}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Khách hàng đã chọn:</h2>
        {selectedIds.length > 0 ? (
          <ul>
            {data
              .filter((item) => selectedIds.includes(item.id))
              .map((item) => (
                <li key={item.id}>{item.customers}</li>
              ))}
          </ul>
        ) : (
          <p>Chưa có khách hàng nào được chọn.</p>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={handleDeselectAll}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Bỏ chọn tất cả
        </button>
      </div>
    </div>
  );
};

export default CustomerSelector;
