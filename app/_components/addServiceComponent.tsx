// app/_components/AddServicesComponent.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams,  } from "next/navigation";
import Header from "./Header";
import { createServices, getServicesById, updateServices } from "../services/serviceServices";

export default function AddServiceComponent() {
  const [service, setService] = useState<any>({
    id: "1",
    name: "",
    details: ""
  });
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (serviceId) {
      const fetchTask = async () => {
        try {
          const data = await getServicesById(serviceId);
          setService(data);
          setIsEditing(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTask();
    }
  }, [serviceId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setService((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: service.id,
      name: service.name,
      details: service.details
    };
    try {
      if (serviceId && isEditing) {
        await updateServices(serviceId, data);
        setIsEditing(false);
        router.push("/services");
      }else {
      await createServices(data);
      router.push("/services");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="p-4 max-w-lg mx-auto my-0">
        <h2 className="text-2xl font-semibold mb-4">Add Service</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Service Name:
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleInputChange}
              className="w-full border p-2 mt-1"
              placeholder="Enter service name"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
