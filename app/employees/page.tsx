
import { T_Employee, columns } from "@/app/employees/columns"
import  DataTable  from "@/app/employees/data-table"
import { createClient } from "@/lib/supabase/server";

async function getNumberOfEmployees():Promise<number>{
  const supabase = await createClient();
  
  let { data, error } = await supabase
  .rpc('number_of_employees')
  if (error) console.error(error)
  

  
  return data ;

}
async function fetchData(): Promise<T_Employee[]> {
  const num :number = await getNumberOfEmployees();
    const supabase = await createClient();
   
    const { data, error } = await supabase.from("employees").select("*").range(0,num);
    if (error) {
      console.error("error", error);
   
  };
  return data as T_Employee[];
  };

  export default async function Page() {
  const employees = await fetchData();
  if (!employees) {
    return <div>Loading...</div>
  }
  
return (
<div className="container mx-auto py-10">
    <DataTable<T_Employee, any> columns={columns} data={employees}/>
    </div>
)

}