// app/_components/AddFacilityComponent.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function AddFacilityComponent() {
  const [facilityName, setFacilityName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing facilities from localStorage
    const existingFacilities = JSON.parse(localStorage.getItem("facilities") || "[]");

    // Add new facility to the list
    const updatedFacilities = [...existingFacilities, { name: facilityName }];

    // Save updated list back to localStorage
    localStorage.setItem("facilities", JSON.stringify(updatedFacilities));

    // Navigate back to facilities list
    router.push("/facilities");
  };

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Add Facility</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Facility Name:
            <input
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className="w-full border p-2 mt-1"
              placeholder="Enter facility name"
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
