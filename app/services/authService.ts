import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7000/api';

// Register user
export const registerUser = async (email: string, password: string, role: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    role,
  });
  return response.data;
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
