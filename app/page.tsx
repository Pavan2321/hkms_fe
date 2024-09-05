"use client"
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineBell, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const users = [
  { name: 'John Doe', role: 'Cleaner', assignedTasks: 5 },
  { name: 'Jane Smith', role: 'Cleaner', assignedTasks: 3 },
  { name: 'Admin User', role: 'Admin', assignedTasks: 0 },
];

const tasks = [
  { id: 1, task: 'Clean 1st floor washroom', status: 'Completed' },
  { id: 2, task: 'Mop 2nd floor hallway', status: 'Pending' },
  { id: 3, task: 'Dust 3rd floor lobby', status: 'In Progress' },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white md:hidden">
                  <AiOutlineMenu className="h-6 w-6" />
                </button>
                <div className="flex-shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Tasks</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Users</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button type="button" className="text-gray-400 hover:text-white">
                  <AiOutlineBell className="h-6 w-6" />
                </button>
                <button type="button" className="text-gray-400 hover:text-white">
                  <AiOutlineUser className="h-6 w-6" />
                </button>
                <button type="button" className="text-gray-400 hover:text-white">
                  <AiOutlineSetting className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {isSidebarOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-75">
              <div className="relative bg-white w-64 p-4">
                <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <FaTimes className="h-6 w-6" />
                </button>
                <div className="mt-8">
                  <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Dashboard</a>
                  <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Tasks</a>
                  <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Users</a>
                </div>
              </div>
            </div>
          )}
          <main className="flex-1">
            <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Housekeeping Dashboard</h1>
              </div>
            </header>
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">Tasks Overview</h3>
                      <ul className="mt-2 text-sm text-gray-500">
                        {tasks.map(task => (
                          <li key={task.id} className="flex justify-between py-1">
                            <span>{task.task}</span>
                            <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Pending' ? 'text-red-500' : 'text-yellow-500'}>
                              {task.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
                      <ul className="mt-2 text-sm text-gray-500">
                        {users.map(user => (
                          <li key={user.name} className="flex justify-between py-1">
                            <span>{user.name} ({user.role})</span>
                            <span className="text-gray-900">Tasks: {user.assignedTasks}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">Recent Logs</h3>
                      <p className="mt-2 text-sm text-gray-500">Recent activities and logs from the housekeeping system.</p>
                      <ul className="mt-4 text-sm text-gray-500">
                        <li className="py-1">Task "Clean 1st floor washroom" completed by John Doe.</li>
                        <li className="py-1">Task "Mop 2nd floor hallway" started by Jane Smith.</li>
                        <li className="py-1">New user Admin User added to the system.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
