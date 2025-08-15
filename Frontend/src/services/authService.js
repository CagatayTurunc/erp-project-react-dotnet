// src/services/authService.js
import axios from "axios";

// Backend API'nizin temel adresini buraya yazın.
// .NET backend'iniz için bu genellikle projenin launchSettings.json dosyasında bulunur.
const apiClient = axios.create({
  baseURL: "https://localhost:44320/api/Auth/", // Sadece base URL
});

// Gelen veriyi {email, password} objesi olarak alması daha standart bir yaklaşımdır.
export const login = async (credentials) => {
  // Sadece endpoint'i belirtmemiz yeterli: /Auth/login
  const response = await apiClient.post("/login", credentials);
  return response.data; // .NET tarafında genellikle { token: "..." } gibi bir obje döner
};

export const register = async (userData) => {
  // Sadece endpoint'i belirtmemiz yeterli: /Auth/register
  const response = await apiClient.post("/register", userData);
  return response.data;
};