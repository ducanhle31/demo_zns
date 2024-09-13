"use client";
import React, { useState, useEffect } from "react";

// Define the User type
interface User {
  user_id: string;
}

export const UserListUidOa = () => {
  const [users, setUsers] = useState<User[]>([]); // Define state for user list
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Current page index
  const [hasMore, setHasMore] = useState(true); // Flag to check if more users exist
  const usersPerPage = 50;
  const apiUrl = "http://localhost:3001/api/v1/uidoa"; // Backend endpoint

  const fetchData = async (offset: number) => {
    try {
      const response = await fetch(`${apiUrl}?offset=${offset}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend");
      }

      const data = await response.json();
      if (data.data.users.length < usersPerPage) {
        setHasMore(false); // No more users to fetch
      }

      // Append new users while filtering out duplicates
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
      <p>Total unique users: {users.length}</p>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>User ID: {user.user_id}</li>
        ))}
      </ul>

      {/* Show Load More button if there are more users */}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
};
