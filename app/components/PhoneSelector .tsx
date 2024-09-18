import { useState, useEffect } from 'react';

const initialData = [
  { id: 1, phone: "84344480909", customers: "2559231188943244647", order_code: "PE010299485",  },
  { id: 2, phone: "84985614219", customers: "3273752948166242705", order_code: "PE010299485",  }
];

interface IPhoneSelectorProps {
  onSelectPhones: (phones: string[]) => void;
}

export const PhoneSelector  = (props:IPhoneSelectorProps) => {
  const {onSelectPhones} =props
  const [data, setData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [newPhone, setNewPhone] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const selectedPhones = data
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.phone);
    onSelectPhones(selectedPhones);
  }, [selectedIds, data, onSelectPhones]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(data.map((item) => item.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleAddPhone = () => {
    if (/^\d+$/.test(newPhone) && !data.some(item => item.phone === newPhone)) {
      const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
      setData([...data, { id: newId, phone: newPhone, customers: '', order_code: '', }]);
      setNewPhone('');
      setError('');
    } else if (!/^\d+$/.test(newPhone)) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập số.');
    } else {
      setError('Số điện thoại đã tồn tại.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewPhone(value);
      setError('');
    }
  };

  const handleDeleteSelected = () => {
    setData(data.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={newPhone}
          onChange={handleInputChange}
          className="border p-2 mr-2 text-sm"
          placeholder="Nhập số điện thoại"
        />
        <button
          onClick={handleAddPhone}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm"
        >
          Thêm số điện thoại
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div>
        {data.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => handleSelect(item.id)}
              className="mr-2"
            />
            <span>{item.phone} </span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button
          onClick={handleSelectAll}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 text-sm"
        >
          Chọn tất cả
        </button>
        <button
          onClick={handleDeselectAll}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 text-sm"
        >
          Bỏ chọn tất cả
        </button>
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          disabled={selectedIds.length === 0}
        >
          Xóa số điện thoại đã chọn
        </button>
      </div>
    </div>
  );
};

export default PhoneSelector;
