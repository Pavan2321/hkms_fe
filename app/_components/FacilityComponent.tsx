// app/_components/FacilityComponent.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { deleteFacility, getFacilities } from "../services/facilityServices";
import { useLoader } from "../hooks/useLoader";
import Spinner from "./Spinner";

export default function FacilityComponent() {
  const { loading, stopLoader } = useLoader();
  const [facilities, setFacilities] = useState<any[]>([]); // Array to store facilities
  const router = useRouter();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await getFacilities(); // Fetch tasks from service
        setFacilities(response);
        stopLoader();
        console.log(response, "list of tasks");
      } catch (error) {
        console.error(error);
      }
    };

    fetchFacilities();
  }, [stopLoader]);

  const handleAddFacility = () => {
    router.push("/add-facility");
  };

  const handleEdit = (id: string) => {
    router.push(`/add-facility/?facilityId=${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      alert("Are you sure want to delete task");
      await deleteFacility(id); // Delete task from service
      setFacilities(facilities.filter((facility: any) => facility._id !== id)); // Update task list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Facilities</h2>

        <div className="grid grid-cols-3 gap-4">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded text-center"
            >
              {facility.name}
            </div>
          ))}
        </div>

        <button
          onClick={handleAddFacility}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          + Add Facility
        </button>
      </div>
    </div>
  );
}
