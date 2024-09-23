import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";


export const getFacilities = async () => {
    try {
        const response = await axios.get(`${API_URL}/facilities`);
        console.log(response, "response");
        return response.data.success.body.data; // Return tasks array
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw error;
    }
}

export const createFacilities = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/facilities`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw error;
    }
};

// Update an existing Facility
export const updateFacilities = async (id: string, data: any) => {
    try {
        const response = await axios.put(`${API_URL}/facilities/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Function to fetch facility by ID
export const getFacilitiesById = async (facilityId: string) => {
    try {
        const response = await axios.get(`${API_URL}/facilities/${facilityId}`);
        return response.data.success.body.data; // Assuming the response contains 'userData'
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Delete a facility 
export const deleteFacility = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/facilities/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };