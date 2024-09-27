"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEmployeeById } from "@/app/services/userService";
import { registerUser, updateUser } from "@/app/services/authService";
import Header from "./Header";
import { useLoader } from "../hooks/useLoader";
import Spinner from "./Spinner";

export default function AddEmployee() {
  const { loading, stopLoader } = useLoader();
  const [employee, setEmployee] = useState<any>({
    first_name: "",
    last_name: "",
    user_id: "",
    email: "",
    password: "",
    phone_number: "",
    role: "user",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("empId");

  // Fetch the employee data if editing
  useEffect(() => {
    console.log(employeeId, 'router query params');
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const employeeData = await getEmployeeById(employeeId); // Fetch employee by ID
          setEmployee(employeeData);
          setIsEditing(true);
          stopLoader();
          console.log(employeeData, 'emp data');
        } catch (error) {
          setError("Failed to fetch employee data.");
        }
      };

      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && employeeId) {
        await updateUser(employeeId, employee); // Update the employee if editing
      } else {
        const _date = new Date();
        const _password = employee.email + _date;
        const { email, password, role, first_name, last_name, phone_number, user_id } = employee;
        await registerUser(email, _password, role, first_name, last_name, phone_number, user_id); // Register a new employee
      }

      router.push("/employee"); // Redirect to employee list after update or add
    } catch (error) {
      setError(
        isEditing ? "Failed to update employee." : "Failed to add employee."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/employee");
  };

  if(loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-full w-full">
      <Header />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? "Update Employee" : "Add Employee"}
        </h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="firstName"
            required
            value={employee?.first_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="lastName"
            required
            value={employee?.last_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee ID
          </label>
          <input
            type="text"
            name="user_id"
            id="userId"
            required
            value={employee?.user_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={employee?.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone number
          </label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={employee?.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* {!isEditing && (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Temporary Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={employee?.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        )} */}

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={employee?.role}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-4 flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
                ? "Update Employee"
                : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
