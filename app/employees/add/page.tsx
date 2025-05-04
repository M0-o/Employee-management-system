

import { type T_Employee } from "@/data/types"
import  EmployeeForm  from "@/components/forms/create-employee"
import { Toaster } from "@/components/ui/toaster"
import {MUTATIONS} from "@/data/mutations"

export default async function Home() {

  const handleSubmit = async (data: T_Employee) => {
    "use server"
    MUTATIONS.addEmployee(data);
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Employee Data Form</h1>
      <div className=" border p-6 rounded-lg shadow-md">
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
      <Toaster />
    </main>
  )
}