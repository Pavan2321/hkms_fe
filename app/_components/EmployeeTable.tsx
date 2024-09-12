"use client";
import { useEffect, useState } from "react";
import Header from "@/app/_components/Header";
import { getUsers } from "@/app/services/userService"; // Import the service
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteUser } from "../services/authService";

export default function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<any[]>([]); // Ensure it's an array
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]); // Ensure it's an array
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null); // State to manage dropdown visibility
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(); // Fetch users from service
        console.log(usersData, "users data");
        if (Array.isArray(usersData)) {
          setEmployees(usersData); // Set employees to state
          setFilteredEmployees(usersData); // Initially display all users
        } else {
          console.error("Fetched data is not an array:", usersData);
          setEmployees([]); // Default to empty array if data is not as expected
          setFilteredEmployees([]); // Default to empty array
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setEmployees([]); // Default to empty array on error
        setFilteredEmployees([]); // Default to empty array
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (!Array.isArray(employees)) return; // Add a check to ensure employees is an array

    const filtered = employees.filter(
      (employee: any) =>
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.user_id.toLowerCase().includes(searchTerm.toLowerCase()) // Changed from id to user_id
    );
    setFilteredEmployees(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredEmployees(employees);
  };

  const handleAddEmployee = () => {
    router.push("/add-employee"); // Navigate to the Add Employee page
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index); // Toggle dropdown visibility
  };

  const handleEdit = (employeeId: string) => {
    router.push(`/add-employee?empId=${employeeId}`)
  };

  // Function to handle delete
  const handleDelete = async (employeeId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (!confirmDelete) return;

    try {
      await deleteUser(employeeId); // Call the API to delete the user
      setEmployees((prev) => {
        const updatedEmployees = prev.filter(employee => employee._id !== employeeId);
        setFilteredEmployees(updatedEmployees); // Update filteredEmployees to reflect the change
        return updatedEmployees;
      });
      console.log("Employee deleted successfully");
    } catch (error) {
      setError("Failed to delete employee.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="flex-1 mx-auto max-w-7xl p-4 sm:px-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by Name, ID, or Email Address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Clear
            </button>
          </div>
          <button
            onClick={handleAddEmployee}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        </div>

        <div className="bg-white rounded shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-2 border-b text-left">Last Name</th>
                <th className="p-2 border-b text-left">First Name</th>
                <th className="p-2 border-b text-left">Email</th>
                <th className="p-2 border-b text-left">ID</th>
                <th className="p-2 border-b text-left">Role</th>
                <th className="p-2 border-b text-left">Actions</th>{" "}
                {/* Changed from Status to Actions */}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee: any, index: number) => (
                  <tr key={index}>
                    <td className="p-2 border-b">{employee.last_name}</td>
                    <td className="p-2 border-b">{employee.first_name}</td>
                    <td className="p-2 border-b">{employee.email}</td>
                    <td className="p-2 border-b">{employee.id}</td>
                    <td className="p-2 border-b">{employee.role}</td>
                    <td className="p-2 border-b text-center relative">
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FiMoreHorizontal className="w-5 h-5" />
                      </button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(employee._id)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-2 border-b text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
