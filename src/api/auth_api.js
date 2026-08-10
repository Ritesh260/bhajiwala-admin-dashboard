import api from "./axios";

// Admin Login
export const loginAdmin = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};