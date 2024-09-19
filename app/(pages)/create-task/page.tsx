// app/pages/tasks/create/page.tsx

"use client";
import CreateTaskComponent from "@/app/_components/CreateTaskComponent";
import Header from "@/app/_components/Header";

export default function CreateTaskPage() {
  return (
    <div className="min-h-full w-full">
      <Header />
      <div className="flex-1 mx-auto max-w-7xl p-4 sm:px-6 lg:p-8">
        {/* <h2 className="text-2xl font-bold mb-4">Create Task</h2> */}

        {/* Render CreateTaskComponent to display the task creation form */}
        <CreateTaskComponent />
      </div>
    </div>
  );
}
