// app/_components/FacilityComponent.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function FacilityComponent() {
  const [facilities, setFacilities] = useState<any[]>([]); // Array to store facilities
  const router = useRouter();

  useEffect(() => {
    // Load facilities from localStorage
    const storedFacilities = JSON.parse(
      localStorage.getItem("facilities") || "[]"
    );
    setFacilities(storedFacilities);
  }, []);

  const handleAddFacility = () => {
    router.push("/add-facility");
  };

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
