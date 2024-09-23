import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";


export const getServices = async () => {
    try {
        const response = await axios.get(`${API_URL}/services`);
        console.log(response, "response");
        return response.data.success.body.data; // Return tasks array
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw error;
    }
}

export const createServices = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/services`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw error;
    }
};

// Update an existing services
export const updateServices = async (id: string, data: any) => {
    try {
        const response = await axios.put(`${API_URL}/services/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Function to fetch services by ID
export const getServicesById = async (serviceId: string) => {
    try {
        const response = await axios.get(`${API_URL}/services/${serviceId}`);
        return response.data.success.body.data; // Assuming the response contains 'userData'
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Delete a service 
export const deleteService = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/services/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };