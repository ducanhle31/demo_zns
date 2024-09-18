//customerApi.tsx
import axios from "axios";

const apiUrl = "http://localhost:3001/api/v1/uidoa";

export const fetchCustomers = async (offset: number) => {
  try {
    const response = await axios.post(`${apiUrl}?offset=${offset}`); // Đổi URL cho phù hợp với API thực tế
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers from the API.");
  }
};
export const fetchCustomersPhone = async () => {
  try {
    const response = await fetch("../../data.json"); // Change the path if needed
    if (!response.ok) {
      throw new Error("Failed to fetch customers from the JSON file.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers from the JSON file.");
  }
};
