import React from "react";

interface ISearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: ISearchInputProps) => {
  return (
    <div className="mx-2">
      <input
        type="text"
        className="w-full h-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500"
        placeholder="Tìm kiếm theo tên sản phẩm..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
