import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    console.log(response, 'response')
    return response.data.success.body.tasks; // Return tasks array
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData: any) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};
