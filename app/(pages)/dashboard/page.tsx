// _components/Dashboard.tsx
import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar"; // Import the Sidebar component

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />

        {/* Dashboard Cards */}
        <section
          className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ marginTop: "-64px" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Projects</h3>
            <p className="text-4xl font-semibold">18</p>
            <p className="text-gray-500">2 Completed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Active Tasks</h3>
            <p className="text-4xl font-semibold">132</p>
            <p className="text-gray-500">28 Completed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Teams</h3>
            <p className="text-4xl font-semibold">12</p>
            <p className="text-gray-500">1 Completed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Productivity</h3>
            <p className="text-4xl font-semibold">76%</p>
            <p className="text-green-500">5% Completed</p>
          </div>
        </section>
      </main>
    </div>
  );
}
