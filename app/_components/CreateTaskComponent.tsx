import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask, getTaskById, updateTask } from "../services/tasksService";
import { getUsers } from "../services/userService";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useRouter, useSearchParams } from "next/navigation";
import "react-step-progress-bar/styles.css";

const CreateTaskStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [task, setTask] = useState<any>({
    assigned_to: "",
    createdAt: "",
    date: "",
    description: "",
    end_time: "",
    facility: "",
    priority: "",
    start_time: "",
    status: "",
    task_type: "",
    title: "",
    updatedAt: "",
  });
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        setError("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const taskData = await getTaskById(taskId);
          setTask(taskData);
          setIsEditing(true);
        } catch (error) {
          setError("Error getting the task");
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date && date < today) return;

    setTask((prevTask: any) => ({ ...prevTask, [field]: date }));
  };

  const getMinTime = (selectedDate: Date | null) => {
    const today = new Date();

    // Check if the selected date is today or if there's no selected date (initial render)
    if (selectedDate) {
      const isToday =
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear();

      // Return current time if it's today
      return isToday ? today : new Date(today.setHours(0, 0, 0, 0));
    }

    // If no date is selected, consider today's time
    return today;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (currentStep === 3) {
      e.preventDefault();
      const taskData = {
        title: task.title,
        description: task.description,
        date: task.date,
        start_time: task.start_time,
        end_time: task.end_time,
        assigned_to: task.assigned_to,
        facility: task.facility,
        task_type: task.task_type,
        priority: task.priority,
      };
      try {
        if (taskId && isEditing) {
          await updateTask(taskId, taskData);
          router.push("/tasks");
        } else {
          await createTask(taskData);
          router.push("/tasks");
        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate the first step inputs (e.g., title, date, time)
      if (!task.title || !task.date || !task.start_time || !task.end_time) {
        setError("Please fill in all required fields in Step 1.");
        return; // Prevent moving to the next step if validation fails
      }
    } else if (currentStep === 2) {
      // Validate the second step inputs (e.g., assigned_to, facility, task_type, priority)
      if (
        !task.assigned_to ||
        !task.facility ||
        !task.task_type ||
        !task.priority
      ) {
        setError("Please fill in all required fields in Step 2.");
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Move to the next step if validation passes
    }
    console.log(currentStep, "current");
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Ensure the form doesn't go below step 1
    }
    console.log(currentStep, "previous");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Update Task" : "Create Task"}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Task Name
              </label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Enter task name"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Date
              </label>
              <DatePicker
                selected={task.date ? new Date(task.date) : null}
                onChange={(date) => handleDateChange(date, "date")}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Date"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">
                  Start Time
                </label>
                <DatePicker
                  selected={task.start_time ? new Date(task.start_time) : null}
                  onChange={(date) => handleDateChange(date, "start_time")}
                  minDate={new Date()} // Disable past dates
                  minTime={getMinTime(task.start_time)} // Disable past times if today
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))} // Max time is end of day
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select Start Time"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">
                  End Time
                </label>
                <DatePicker
                  selected={task.end_time ? new Date(task.end_time) : null}
                  onChange={(date) => handleDateChange(date, "end_time")}
                  minTime={
                    task.start_time ? new Date(task.start_time) : new Date()
                  } // End time can't be before start time
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))} // Max end time is end of day
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select End Time"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
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
              <label className="block text-gray-700 font-medium mb-2">
                Assign To
              </label>
              <select
                name="assigned_to"
                value={task.assigned_to}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select a user</option>
                {users.map((user: any) => (
                  <option key={user?._id} value={user?._first_name}>
                    {user?.first_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Facility
              </label>
              <input
                type="text"
                name="facility"
                value={task.facility}
                onChange={handleInputChange}
                placeholder="Enter facility"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Task Type
              </label>
              <input
                type="text"
                name="task_type"
                value={task.task_type}
                onChange={handleInputChange}
                placeholder="Enter task type"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Review & Submit</h3>
            <div className="mb-4">
              <p>
                <strong>Task Name:</strong> {task.title}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {task.date ? new Date(task.date).toLocaleDateString() : ""}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {task.start_time
                  ? new Date(task.start_time).toLocaleTimeString()
                  : ""}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {task.end_time
                  ? new Date(task.end_time).toLocaleTimeString()
                  : ""}
              </p>
              <p>
                <strong>Assigned To:</strong> {task.assigned_to}
              </p>
              <p>
                <strong>Facility:</strong> {task.facility}
              </p>
              <p>
                <strong>Task Type:</strong> {task.task_type}
              </p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <ProgressBar
        percent={(currentStep - 1) * 50} // 50% for each step (2 steps + review)
        filledBackground="linear-gradient(to right, #4db6ac, #003d34)"
        className="mb-6"
      >
        <Step>
          {({ active }: any) => (
            <div className={`step ${active ? "active" : ""}`}></div>
          )}
        </Step>
        <Step>
          {({ active }: any) => (
            <div className={`step ${active ? "active" : ""}`}></div>
          )}
        </Step>
        <Step>
          {({ active }: any) => (
            <div className={`step ${active ? "active" : ""}`}></div>
          )}
        </Step>
      </ProgressBar>

      <div className="p-6">
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-400 text-white p-2 rounded"
            >
              Previous
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleSubmit}
            >
              {isEditing ? "Update Task" : "Create Task"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTaskStepperForm;
