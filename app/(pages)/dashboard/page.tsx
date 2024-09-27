"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar"; // Import the Sidebar component
import Spinner from "@/app/_components/Spinner";
import { useLoader } from "@/app/hooks/useLoader";
import { getFacilities } from "@/app/services/facilityServices";
import { getServices } from "@/app/services/serviceServices";
import { getTasks } from "@/app/services/tasksService";
import { getUsers } from "@/app/services/userService";


export default function Dashboard() {
  const { loading, stopLoader } = useLoader();
  const [users, setUsers] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    stopLoader();
  }, []);

  useEffect(() => {
    fetchFacility();
    fetchServices();
    fetchTasks();
    fetchUsers();
  },[])

  const fetchUsers = async() =>{
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFacility = async() =>{
    try {
      const response = await getFacilities();
      setFacilities(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchServices = async() =>{
    try {
      const response = await getServices();
      setServices(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTasks = async() =>{
    try {
      const response = await getTasks(); // Fetch tasks from service
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Render the loader while loading is true
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner /> {/* The loader/spinner component */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />

        {/* Dashboard Cards */}
        <section
          className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ marginTop: "-64px" }}
        >

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Tasks</h3>
            <p className="text-4xl font-semibold">{tasks.length}</p>
            {/* <p className="text-gray-500">28 Completed</p> */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Users</h3>
            <p className="text-4xl font-semibold">{users.length}</p>
            {/* <p className="text-gray-500">1 Completed</p> */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Facilities</h3>
            <p className="text-4xl font-semibold">{facilities.length}</p>
            {/* <p className="text-green-500">5% Completed</p> */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <p className="text-4xl font-semibold">{services.length}</p>
            {/* <p className="text-gray-500">2 Completed</p> */}
          </div>
        </section>
      </main>
    </div>
  );
}
