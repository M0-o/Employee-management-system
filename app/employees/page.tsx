
import { columns } from "@/components/data-table/config/columns"
import  DataTable  from "@/components/data-table/data-table"
import { T_Employee } from "@/data/types"
import {QUERIES } from "@/data/queries"


  export default async function Page() {
  const employees = await QUERIES.getEmployees();
  
  if (!employees) {
    return <div>Loading...</div>
  }
  
return (
<div className="container mx-auto py-10">
    <DataTable<T_Employee, any> columns={columns} data={employees}/>
    </div>
)

}