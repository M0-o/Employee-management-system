import { createClient } from "@/utils/supabase/server";
import { Employee, columns } from "./columns"
import  DataTable  from "./data-table"
import { DataTablePagination } from "./data-table-pagination";

async function fetchData(): Promise<Employee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("employees").select("*");
  if (error) {
    console.error("error", error);
 
};
return data as Employee[];
};

export default async function Employees() {
 
    const employees = await fetchData();

    return(
      <div className="container mx-auto py-10">

       <DataTable<Employee, any> columns={columns} data={employees}/>
      </div>
    )
    
}
