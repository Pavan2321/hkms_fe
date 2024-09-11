// pages/employees.tsx
import EmployeeTable from "@/app/_components/EmployeeTable";
import Sidebar from "@/app/_components/Sidebar";

export default function EmployeesPage() {
  return (
    <div className="min-h-full flex">
      <EmployeeTable />
    </div>
  );
}
