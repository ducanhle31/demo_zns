import axios from "axios";

export const instance = axios.create({
  baseURL: "https://zaloapp.ongdev.online/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("zalo_backend_token")}`,
  },
});


