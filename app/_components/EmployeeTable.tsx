"use client";
import { useState } from "react";
import Header from "@/app/_components/Header";
import AddEmployee from "@/app/_components/AddEmployee";

const initialEmployees = [
  {
    lastName: "Stonelius",
    firstName: "Marcus",
    email: "kilam49041@ulforex.com",
    id: "12345",
    role: "Administrator",
    dateCreated: "8/31/2022",
    lastLogin: "8/31/2022",
    status: "Active",
  },
  {
    lastName: "Lee",
    firstName: "Sophia",
    email: "sophia.lee@company.com",
    id: "54321",
    role: "Manager",
    dateCreated: "9/10/2024", // Updated date
    lastLogin: "9/10/2024", // Updated date
    status: "Active",
  },
  {
    lastName: "Gupta",
    firstName: "Ravi",
    email: "ravi.gupta@company.com",
    id: "98765",
    role: "Developer",
    dateCreated: "7/15/2023",
    lastLogin: "8/25/2024",
    status: "Active",
  },
  {
    lastName: "Sanchez",
    firstName: "Isabella",
    email: "isabella.sanchez@company.com",
    id: "24680",
    role: "Designer",
    dateCreated: "6/01/2024",
    lastLogin: "9/08/2024",
    status: "Active",
  },
  {
    lastName: "Nguyen",
    firstName: "Linh",
    email: "linh.nguyen@company.com",
    id: "75931",
    role: "QA Tester",
    dateCreated: "5/12/2024",
    lastLogin: "9/05/2024",
    status: "Active",
  }
];

export default function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const handleSearch = () => {
    const filtered = initialEmployees.filter(
      (employee) =>
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredEmployees(initialEmployees);
  };

  const handleAddEmployee = (newEmployee: any) => {
    setFilteredEmployees([...filteredEmployees, newEmployee]);
    setShowAddEmployeeForm(false); // Close the form after adding
  };

  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="flex-1 mx-auto max-w-7xl p-4 sm:px-6 lg:p-8">
        {showAddEmployeeForm ? (
          <AddEmployee onAddEmployee={handleAddEmployee} />
        ) : (
          <>
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
                onClick={() => setShowAddEmployeeForm(true)}
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
                    <th className="p-2 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr key={index}>
                      <td className="p-2 border-b">{employee.lastName}</td>
                      <td className="p-2 border-b">{employee.firstName}</td>
                      <td className="p-2 border-b">{employee.email}</td>
                      <td className="p-2 border-b">{employee.id}</td>
                      <td className="p-2 border-b">{employee.role}</td>
                      <td className="p-2 border-b">{employee.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
