import { useState } from "react";

// Initial fake users data
const initialFakeUsers = [
  {
    id: 1,
    phone: "84344480909",
    customers: "2559231188943244647",
    customer_name: "Nguyễn Thị Hoàng Anh",
  },
  {
    id: 2,
    phone: "84376022820",
    customers: "4398",
    customer_name: "Nguyễn Văn A",
  },
  {
    id: 3,
    phone: "84312345678",
    customers: "12345",
    customer_name: "Trần Thị B",
  },
  {
    id: 4,
    phone: "84398765432",
    customers: "54321",
    customer_name: "Lê Hoàng C",
  },
];

export const CampaignFile = () => {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [users, setUsers] = useState(initialFakeUsers);
  const [newUser, setNewUser] = useState({
    phone: "",
    customers: "",
    customer_name: "",
  });
  const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox

  // Toggle selection of a user
  const handleToggleUser = (userId: number) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle input changes for new user
  const handleNewUserChange = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  // Add a new user to the users list
  const handleAddNewUser = () => {
    if (
      newUser.phone.trim() &&
      newUser.customers.trim() &&
      newUser.customer_name.trim()
    ) {
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { id: nextId, ...newUser }]);
      setNewUser({ phone: "", customers: "", customer_name: "" });
    } else {
      alert("Please fill in all fields to add a new user.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate file name and description
    if (!fileName.trim() || !fileDescription.trim()) {
      alert("Please provide a valid file name and description.");
      return;
    }

    if (selectedUserIds.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    const selectedUsers = users.filter((user) =>
      selectedUserIds.includes(user.id)
    );

    const data = {
      file_name: fileName,
      file_description: fileDescription,
      file_id: `${new Date().getTime()}`, // Auto-generated file_id
      customers: selectedUsers,
    };

    try {
      const response = await fetch("http://localhost:3001/api/v1/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Data submitted successfully!");
        setFileName("");
        setFileDescription("");
        setSelectedUserIds([]);
        setSelectAll(false); // Reset "Select All"
      } else {
        alert("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      {/* File Information */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tên tệp"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full mb-2"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={fileDescription}
          onChange={(e) => setFileDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* User Selection */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Chọn Khách hàng</h3>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Chọn tất cả
          </label>
        </div>
        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-2">
          {users.map((user) => (
            <label key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUserIds.includes(user.id)}
                onChange={() => handleToggleUser(user.id)}
                className="mr-2"
              />
              <span>
                {user.customer_name} - {user.phone}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Add New User */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Thêm khách hàng</h3>
        <div className="flex  space-x-4">
          <input
            type="text"
            placeholder="Tên"
            value={newUser.customer_name}
            onChange={(e) =>
              handleNewUserChange("customer_name", e.target.value)
            }
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => handleNewUserChange("phone", e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="UID"
            value={newUser.customers}
            onChange={(e) => handleNewUserChange("customers", e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddNewUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-3 rounded-lg w-full"
      >
        Submit
      </button>
    </div>
  );
};
