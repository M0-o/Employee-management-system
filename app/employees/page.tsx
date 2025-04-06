
import { Employee, columns } from "@/app/employees/columns"
import  DataTable  from "@/app/employees/data-table"
import { createClient } from "@/utils/supabase/server";

async function fetchData(): Promise<Employee[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("employees").select("*");
    if (error) {
      console.error("error", error);
   
  };
  return data as Employee[];
  };

  export default async function Page() {
  const employees = await fetchData();
  if (!employees) {
    return <div>Loading...</div>
  }
return (
<div className="container mx-auto py-10">
    <DataTable<Employee, any> columns={columns} data={employees}/>
    </div>
)

}