// app/_components/FacilityComponent.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { deleteService, getServices } from "../services/serviceServices";

export default function ServiceComponent() {
  const [services, setServices] = useState<any[]>([]); // Array to store facilities
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices(); // Fetch tasks from service
        setServices(response);
        console.log(response, "list of tasks");
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = () => {
    router.push("/add-service");
  };

  const handleEdit = (id: string) => {
    router.push(`/add-service/?serviceId=${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      alert('Are you sure want to delete task');
      await deleteService(id); // Delete task from service
      setServices(services.filter((service: any) => service._id !== id)); // Update task list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Services</h2>

        <div className="grid grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded text-center"
            >
              {service.name}
            </div>
          ))}
        </div>

        <button
          onClick={handleAddService}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          + Add Service
        </button>
      </div>
    </div>
  );
}
