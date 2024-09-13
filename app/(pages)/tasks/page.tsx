// app/pages/tasks/page.tsx

"use client";
import Header from "@/app/_components/Header";
import TaskComponent from "@/app/_components/TaskComponent"; // Import TaskComponent

export default function TasksPage() {
  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="flex-1 mx-auto max-w-7xl p-4 sm:px-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>

        {/* Render TaskComponent to display the list of tasks */}
        <TaskComponent />
      </div>
    </div>
  );
}
