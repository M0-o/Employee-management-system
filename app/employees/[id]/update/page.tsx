import { type T_Employee } from "@/data/types"
import  EmployeeForm  from "@/components/forms/create-employee"
import { Toaster } from "@/components/ui/toaster"
import {MUTATIONS} from "@/data/mutations"
import { QUERIES } from "@/data/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
type ParamsWithId = Promise<any> & {
    id: string
  }
  
export default async function Home({
    params,
  }: {
    params: ParamsWithId
  }) {
    const id:number = (await params).id;
    const employee = await QUERIES.getEmployee(id);
  const handleSubmit = async (data: T_Employee) => {
    "use server"
    MUTATIONS.updateEmployee(data);
    revalidatePath(`/employees/${id}`);
    redirect(`/employees/${id}`);
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Employee Data Form</h1>
      <div className=" border p-6 rounded-lg shadow-md">
        <EmployeeForm defaultValues={employee} onSubmit={handleSubmit} />
      </div>
      <Toaster />
    </main>
  )
}