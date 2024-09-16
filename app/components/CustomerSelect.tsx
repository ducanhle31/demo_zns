"use client";
import React, { useState, useEffect } from "react";
import { fetchCustomers } from "../api/customerApi";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../store/campaignSlice";
import { RootState } from "../store";

// Define the User type
interface User {
  user_id: string;
}

export const CustomerSelect = () => {
  const [users, setUsers] = useState<User[]>([]); // Define state for user list
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // For selected UIDs
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Current page index
  const [hasMore, setHasMore] = useState(true); // Flag to check if more users exist
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const usersPerPage = 50;
  const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state: RootState) => state.campaign.customer
  );

  const fetchData = async (offset: number) => {
    try {
      const data = await fetchCustomers(offset); // Use the API function

      if (data.data.users.length < usersPerPage) {
        setHasMore(false); // No more users to fetch
      }

      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, ...data.data.users];

        // Create a new array with unique user_id values
        const uniqueUsers = newUsers.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.user_id === user.user_id)
        );

        return uniqueUsers;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page * usersPerPage); // Fetch users when page changes
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch the next set
  };

  const handleSelect = (userId: string) => {
    setSelectedUsers(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // Deselect
          : [...prevSelected, userId] // Select
    );
  };

  const handleSelectAll = () => {
    const allUserIds = users.map((user) => user.user_id);
    setSelectedUsers(
      selectedUsers.length === allUserIds.length ? [] : allUserIds
    ); // Toggle select all
  };

  const handleConfirmSelection = () => {
    dispatch(setCustomer(selectedUsers.join(","))); // Save selected users to Redux
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <div className="font-bold">Gửi theo UID</div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Chọn Khách Hàng
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Chọn người dùng</h2>
            <p>Total unique users: {users.length}</p>
            <button
              onClick={handleSelectAll}
              className="bg-gray-500 text-white p-2 rounded mb-4"
            >
              {selectedUsers.length === users.length
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </button>
            <ul className="h-64 overflow-y-scroll mb-4">
              {users.map((user) => (
                <li
                  key={user.user_id}
                  className="flex items-center justify-between"
                >
                  <span>User ID: {user.user_id}</span>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.user_id)}
                    onChange={() => handleSelect(user.user_id)}
                  />
                </li>
              ))}
            </ul>

            {/* Show Load More button if there are more users */}
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-green-500 text-white p-2 rounded"
              >
                Load More
              </button>
            )}

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleConfirmSelection}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Xác Nhận
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-2">
        <h3>Khách Hàng Đã Chọn:</h3>
        {selectedCustomer && selectedCustomer.length > 0 ? (
          <ul>
            {selectedCustomer.split(",").map((userId: string) => (
              <li key={userId}>User ID: {userId}</li>
            ))}
          </ul>
        ) : (
          <p>Chưa có khách hàng nào được chọn</p>
        )}
      </div>
    </div>
  );
};
