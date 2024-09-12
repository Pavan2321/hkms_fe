// services/userService.ts
import axios from "axios";

// Replace with your actual backend API endpoint
const API_BASE_URL = "http://localhost:7000/api";

// Function to fetch users from the backend
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log("this is called", response);
    return response.data.success.body.usersData; // Assuming usersData is the key in the response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to fetch employee by ID
export const getEmployeeById = async (employeeId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${employeeId}`);
    return response.data.success.body.userData; // Assuming the response contains 'userData'
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
