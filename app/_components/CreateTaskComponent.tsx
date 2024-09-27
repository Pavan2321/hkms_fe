import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask, getAvailableUsers, getTaskById, updateTask } from "../services/tasksService";
import { getUsers } from "../services/userService";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useRouter, useSearchParams } from "next/navigation";
import "react-step-progress-bar/styles.css";
import { useLoader } from "../hooks/useLoader";
import Spinner from "./Spinner";
import { getFacilities } from "../services/facilityServices";
import { getServices } from "../services/serviceServices";

const CreateTaskStepperForm = () => {
  const { loading, stopLoader } = useLoader();
  const [currentStep, setCurrentStep] = useState(1);
  const [task, setTask] = useState<any>({
    assigned_to: "",
    createdAt: "",
    date: "",
    description: "",
    end_time: "",
    facility_id: "",
    service_id: "",
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
  const [facilities, setFacilities] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [filterAvailableUsers, setFilterAvailableUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        stopLoader();
      } catch (error) {
        setError("Error fetching users");
      }
    };
    fetchUsers();
    fetchFacility();
    fetchServices();
    fetchAvailableUsers();
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
  
  const fetchFacility = async () => {
    try {
      const respone = await getFacilities();
      setFacilities(respone);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const respone = await getServices();
      setServices(respone);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailableUsers = async() => {
    try {
      const response = await getAvailableUsers();
      setAvailableUsers(response)
    } catch (error) {
      console.log(error)
    }
  }
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setTask((prevTask: any) => ({ ...prevTask, [field]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3) {
      const taskData = {
        title: task.title,
        description: task.description,
        date: task.date,
        start_time: task.start_time,
        end_time: task.end_time,
        assigned_to: task.assigned_to,
        facility_id: task.facility_id,
        service_id: task.service_id,
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

  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate the first step inputs (e.g., title, date, time)
      if (!task.title || !task.date || !task.start_time || !task.end_time) {
        setError("Please fill in all required fields in Step 1.");
        return; // Prevent moving to the next step if validation fails
      }
      console.log(task.start_time, task.end_time)
      const filterUsers =  filterAvailableUsersData(task.start_time, task.end_time)
      setFilterAvailableUsers(filterUsers)
      console.log('filterAvailableUsers',filterUsers)
    } else if (currentStep === 2) {
      // Validate the second step inputs (e.g., assigned_to, facility, task_type, priority)
      if (
        !task.assigned_to ||
        !task.facility_id ||
        !task.service_id ||
        !task.priority
      ) {
        console.log(task.assigned_to, task.facility_id, task.service_id, task.priority, 'task');
        setError("Please fill in all required fields in Step 2.");
        return; // Prevent moving to the next step if validation fails
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Move to the next step if validation passes
      setError(null); // Clear any previous errors
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Ensure the form doesn't go below step 1
    }
  };

  function formatTimeToHHMM(date:any) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function convertTimeToDate(time:any) {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Set hours and minutes, zero out seconds and milliseconds
  return date;
}

  function filterAvailableUsersData(startTime:any, endTime:any) {
   
    const desiredStart = new Date(startTime);
    const desiredEnd = new Date(endTime);
    console.log(desiredStart, desiredEnd);

    const available=  availableUsers.filter(user => {
      console.log(user, 'filtered user')
        const value =  user.availableSlots.some((slot:any) => {
          console.log('slot',slot)
          const slotStart = convertTimeToDate(slot.start); 
          const slotEnd = convertTimeToDate(slot.end); 

          return slotStart <= desiredStart && slotEnd >= desiredEnd;
        });
        return value;
    }); 
    return available;
}

const filteredUsers = users.filter(user => filterAvailableUsers.some(filteredUser => filteredUser.user_id === user.user_id));

const filteredUserName = (userId:string) =>{
  const value =  users.find(user => user.user_id === userId);

  return value? value.first_name + " " + value.last_name : "";
}

const filterFacilityName = (facilityId:string) =>{
  const value =  facilities.find(facility => facility.id === facilityId);

  return value? value.name : "";
}

const filterServiceName = (serviceId:string) =>{
  const value =  services.find(service => service.id === serviceId);

  return value? value.name : "";
}


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
                  minDate={new Date()}
                  minTime={
                    task.date &&
                    new Date(task.date).toDateString() ===
                      new Date().toDateString()
                      ? new Date()
                      : new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
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
                  }
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
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
                <option value="" disabled>
                  Select user
                </option>
                {filteredUsers.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.first_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Facility
              </label>
              <select
                name="facility_id"
                value={task.facility_id}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="" disabled>
                  Select facility
                </option>
                {facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Service
              </label>
              <select
                name="service_id"
                value={task.service_id}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="" disabled>
                  Select service
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
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
                <option value="" disabled>
                  Select priority
                </option>
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
            <p>Task Name: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Date: {task.date && new Date(task.date).toLocaleDateString()}</p>
            <p>
              Start Time:{" "}
              {task.start_time &&
                new Date(task.start_time).toLocaleTimeString()}
            </p>
            <p>
              End Time:{" "}
              {task.end_time && new Date(task.end_time).toLocaleTimeString()}
            </p>
            <p>Assigned To: {filteredUserName(task.assigned_to)}</p>
            <p>Facility: {filterFacilityName(task.facility_id)}</p>
            <p>Service: {filterServiceName(task.service_id)}</p>
            <p>Priority: {task.priority}</p>
          </div>
        );
      default:
        return null;
    }
  };

  if(loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <ProgressBar percent={(currentStep / 3) * 100}>
        <Step>
          {({ accomplished }: any) => (
            <div className={`step ${accomplished ? "active" : ""}`}></div>
          )}
        </Step>
        <Step>
          {({ accomplished }: any) => (
            <div className={`step ${accomplished ? "active" : ""}`}></div>
          )}
        </Step>
        <Step>
          {({ accomplished }: any) => (
            <div className={`step ${accomplished ? "active" : ""}`}></div>
          )}
        </Step>
      </ProgressBar>
      <div className="p-6">
        {error && <p className="text-red-500">{error}</p>}

        {renderStep()}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTaskStepperForm;
