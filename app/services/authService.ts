import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7000/api';

// Register user
export const registerUser = async (email: string, password: string, role: string, first_name: string, last_name: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    role,
    first_name,
    last_name
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

// Update user
export const updateUser = async (employeeId: string, employeeData: any) => {
  try {
    const response = await axios.put(`${API_URL}/users/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Failed to update employee:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (employeeId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete employee:", error);
    throw error;
  }
};