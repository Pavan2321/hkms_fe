import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask } from "../services/tasksService"; // Adjust this import based on your project structure
import { getUsers } from "../services/userService"; // For fetching users list
import { useRouter } from "next/navigation";

const CreateTaskComponent = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [facility, setFacility] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("medium"); // Default priority
  const [users, setUsers] = useState([]);

  const router = useRouter();

  // Fetch users for the 'Assigned to' dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      console.log(response, 'data')
      setUsers(response);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const taskData = {
      title: taskName,
      description,
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      assigned_to: assignedTo,
      facility,
      task_type: taskType,
      priority,
    };

    try {
      await createTask(taskData);
      router.push("/tasks"); // Redirect to tasks page after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select Date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Time Pickers */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Select Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15} // Time intervals of 15 minutes
              timeCaption="Start Time"
              dateFormat="h:mm aa" // 12-hour format
              placeholderText="Select Start Time"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Select End Time</label>
            <DatePicker
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15} // Time intervals of 15 minutes
              timeCaption="End Time"
              dateFormat="h:mm aa" // 12-hour format
              placeholderText="Select End Time"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Assigned to, Facility, Task Type, and Priority */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assigned to */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a user</option>
              {users.map((user: any) => (
                <option key={user?._id} value={user?._id}>
                  {user?.first_name}
                </option>
              ))}
            </select>
          </div>

          {/* Facility */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Facility</label>
            <input
              type="text"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              placeholder="Enter facility"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Task Type</label>
            <input
              type="text"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              placeholder="Enter task type"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskComponent;
