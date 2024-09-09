import Header from "@/app/_components/Header";
import Link from "next/link";

const users = [
  { name: "John Doe", role: "Cleaner", assignedTasks: 5 },
  { name: "Jane Smith", role: "Cleaner", assignedTasks: 3 },
  { name: "Admin User", role: "Admin", assignedTasks: 0 },
];

const tasks = [
  { id: 1, task: "Clean 1st floor washroom", status: "Completed" },
  { id: 2, task: "Mop 2nd floor hallway", status: "Pending" },
  { id: 3, task: "Dust 3rd floor lobby", status: "In Progress" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="flex-1">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Housekeeping Dashboard
            </h1>
            <Link href="/employee">
              <div className="text-blue-500">Go to Employees Page</div>
            </Link>
          </div>
        </header>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Tasks Overview
                  </h3>
                  <ul className="mt-2 text-sm text-gray-500">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex justify-between py-1">
                        <span>{task.task}</span>
                        <span
                          className={
                            task.status === "Completed"
                              ? "text-green-500"
                              : task.status === "Pending"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }
                        >
                          {task.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Users Management
                  </h3>
                  <ul className="mt-2 text-sm text-gray-500">
                    {users.map((user) => (
                      <li key={user.name} className="flex justify-between py-1">
                        <span>
                          {user.name} ({user.role})
                        </span>
                        <span className="text-gray-900">
                          Tasks: {user.assignedTasks}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Logs
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Recent activities and logs from the housekeeping system.
                  </p>
                  <ul className="mt-4 text-sm text-gray-500">
                    <li className="py-1">
                      Task "Clean 1st floor washroom" completed by John Doe.
                    </li>
                    <li className="py-1">
                      Task "Mop 2nd floor hallway" started by Jane Smith.
                    </li>
                    <li className="py-1">
                      New user Admin User added to the system.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
