// app/_components/TaskComponent.tsx

"use client";
import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/app/services/tasksService"; // Import task services
import { useRouter } from "next/navigation";

export default function TaskComponent() {
  const [tasks, setTasks] = useState<any[]>([]); // Array to store tasks
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(); // Fetch tasks from service
        setTasks(response);
        console.log(response, "list of tasks");
      } catch (error) {
        setError("Failed to fetch tasks.");
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = () => {
    router.push("/create-task");
  };

  const handleEdit = (id: string) => {
    router.push(`/create-task/?taskId=${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id); // Delete task from service
      alert('Task deletion successful');
      setTasks(tasks.filter((task: any) => task._id !== id)); // Update task list after deletion
    } catch (error) {
      setError("Failed to delete task.");
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={handleCreateTask}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2 ml-auto"
      >
        + Create Task
      </button>
      <div className="bg-white rounded shadow-md overflow-x-auto">
        {/* Show error if there's an issue fetching tasks */}
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 border-b text-left">Task Name</th>
              <th className="p-2 border-b text-left">Assigned</th>
              <th className="p-2 border-b text-left">Facility</th>
              <th className="p-2 border-b text-left">Task Type</th>
              <th className="p-2 border-b text-left">Priority</th>
              <th className="p-2 border-b text-left">Start Time</th>
              <th className="p-2 border-b text-left">End Time</th>
              <th className="p-2 border-b text-left">Due Date</th>
              <th className="p-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task._id}>
                  <td className="p-2 border-b">{task.title}</td>
                  <td className="p-2 border-b">{task.assigned_to}</td>
                  <td className="p-2 border-b">{task.facility}</td>
                  <td className="p-2 border-b">{task.task_type}</td>
                  <td className="p-2 border-b">{task.priority}</td>
                  <td className="p-2 border-b">
                    {new Date(task.start_time).toLocaleTimeString()}
                  </td>
                  <td className="p-2 border-b">
                    {new Date(task.end_time).toLocaleTimeString()}
                  </td>
                  <td className="p-2 border-b">
                    {new Date(task.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-2 border-b text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
