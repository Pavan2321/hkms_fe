import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask } from "../services/tasksService"; // Adjust import
import { getUsers } from "../services/userService"; // For fetching users
import { ProgressBar, Step } from "react-step-progress-bar";
import { useRouter } from "next/navigation";
import "react-step-progress-bar/styles.css";

const CreateTaskStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [facility, setFacility] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("medium");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Fetch users for the 'Assigned to' dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
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
      router.push("/tasks"); // Redirect after submission
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Helper functions for step navigation
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Form steps rendering
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Task Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Task Name</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Date"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Start Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select Start Time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">End Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select End Time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Assignment & Metadata</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Facility</label>
              <input
                type="text"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                placeholder="Enter facility"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Task Type</label>
              <input
                type="text"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                placeholder="Enter task type"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Description & Submission</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              Submit Task
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

      {/* Progress Bar */}
      <ProgressBar
        percent={(currentStep - 1) * 50}
        filledBackground="linear-gradient(to right, #00f, #00bfff)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed" : ""}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed" : ""}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed" : ""}`}></div>
          )}
        </Step>
      </ProgressBar>

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={nextStep}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTaskStepperForm;
