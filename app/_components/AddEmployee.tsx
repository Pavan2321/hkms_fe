import { useState } from "react";

interface Employee {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  mobilePhone: string;
  password: string;
  status: string;
}

interface AddEmployeeProps {
  onAddEmployee: (employee: Employee) => void;
}

export default function AddEmployee({ onAddEmployee }: AddEmployeeProps) {
  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    mobilePhone: "",
    password: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      dateCreated: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleDateString(),
    };
    onAddEmployee(newEmployee);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          value={employee.firstName}
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
          name="lastName"
          id="lastName"
          required
          value={employee.lastName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="employeeId"
          className="block text-sm font-medium text-gray-700"
        >
          Employee ID
        </label>
        <input
          type="text"
          name="employeeId"
          id="employeeId"
          required
          value={employee.employeeId}
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
          value={employee.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobilePhone"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile Phone
        </label>
        <input
          type="tel"
          name="mobilePhone"
          id="mobilePhone"
          value={employee.mobilePhone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

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
          value={employee.password}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          placeholder="8-128 characters, at least one number, one uppercase letter, no spaces"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={employee.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
}
