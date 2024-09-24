// app/_components/AddFacilityComponent.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams,  } from "next/navigation";
import Header from "./Header";
import { createFacilities, getFacilitiesById, updateFacilities } from "../services/facilityServices";
import { useLoader } from "../hooks/useLoader";
import Spinner from "./Spinner";
import { getUid } from "../services/coreServices";

export default function AddFacilityComponent() {
  const { loading, stopLoader } = useLoader();
  const [facility, setFacility] = useState<any>({
    id: "",
    name: "",
    details: ""
  });
  const searchParams = useSearchParams();
  const facilityId = searchParams.get("facilityId");
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (facilityId) {
      const fetchTask = async () => {
        try {
          const data = await getFacilitiesById(facilityId);
          setFacility(data);
          setIsEditing(true);
          stopLoader();
        } catch (error) {
          console.log(error);
        }
      };
      fetchTask();
    }
  }, [facilityId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFacility((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: facility.id || getUid(),
      name: facility.name,
      details: facility.details
    };
    try {
      if (facilityId && isEditing) {
        await updateFacilities(facilityId, data);
        setIsEditing(false);
        router.push("/facilities");
      }else {
      await createFacilities(data);
      router.push("/facilities");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if(loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="p-4 max-w-lg mx-auto my-0">
        <h2 className="text-2xl font-semibold mb-4">Add Facility</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Facility Name:
            <input
              type="text"
              name="name"
              value={facility.name}
              onChange={handleInputChange}
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
