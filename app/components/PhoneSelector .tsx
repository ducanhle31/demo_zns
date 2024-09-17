import React, { useState } from 'react';
import { useCampaign } from '../hook/useCampaign';

interface PhoneData {
  id: number;
  phone: string;
}

export const PhoneSelector = () => {
  const { updatePhone } = useCampaign(); 

  const [data, setData] = useState<PhoneData[]>([
    { id: 1, phone: "84344480909" },
    { id: 2, phone: "84985614219" }
  ]);

  const [selectedPhone, setSelectedPhone] = useState<string[]>([]);
  const [newPhone, setNewPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSelectPhone = (phone: string) => {
    const newSelectedPhone = selectedPhone.includes(phone)
      ? selectedPhone.filter(p => p !== phone)
      : [...selectedPhone, phone];

    setSelectedPhone(newSelectedPhone);
    updatePhone(newSelectedPhone); 
  };

  const handleSelectAll = () => {
    const newSelectedPhone = selectedPhone.length === data.length
      ? []
      : data.map(item => item.phone);

    setSelectedPhone(newSelectedPhone);
    updatePhone(newSelectedPhone);  
  };

  const handleAddPhone = () => {
    if (newPhone.trim() === "") return;

    if (data.some(item => item.phone === newPhone.trim())) {
      setError("Số điện thoại đã tồn tại.");
      return;
    }

    const newPhoneData: PhoneData = {
      id: data.length + 1,
      phone: newPhone.trim()
    };

    setData([...data, newPhoneData]);
    setSelectedPhone([...selectedPhone, newPhone.trim()]); 
    setNewPhone(""); 
    setError(null); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setNewPhone(newValue);
  };

  return (
    <div className="bg-white p-2 text-black">
      <div className="mb-4">
        <input
          type="tel"
          value={newPhone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại mới"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddPhone}
          className="bg-blue-500 text-white p-2 rounded mt-2 text-sm"
        >
          Thêm số điện thoại
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="mb-2">
        <h1 className="text-xl font-bold mb-4">Chọn số điện thoại</h1>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedPhone.length === data.length}
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
                checked={selectedPhone.includes(item.phone)}
                onChange={() => handleSelectPhone(item.phone)}
                className="mr-2"
              />
              {item.phone}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Số đã chọn:</h2>
        {selectedPhone.length > 0 ? (
          <ul>
            {selectedPhone.map(phone => (
              <li key={phone}>{phone}</li>
            ))}
          </ul>
        ) : (
          <p>Chưa có số nào được chọn.</p>
        )}
      </div>
    </div>
  );
};

export default PhoneSelector;
