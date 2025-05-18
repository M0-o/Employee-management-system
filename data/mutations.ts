import { type T_Employee as Employee } from "./types"
import { createClient } from "@/lib/supabase/server";

export const MUTATIONS = {
    addEmployee: async (employee: Employee)=>{
        const supabase = await createClient();
        const {data ,error} = await supabase
        .from('employees')
        .insert(employee)
        .select() 

        if (error) {
            console.error(error);
            throw new Error(`Error executing query: ${error.message}`);
        }
        
        return data ;
    },

    updateEmployee: async (employee: Employee)=> {
        const supabase = await createClient();

        const { data, error } = await supabase
  .from('employees')
  .update(employee)
  .eq('emp_id', employee.emp_id)
  .select()

  if (error) {
    console.error(error);
    throw new Error(`Error executing query: ${error.message}`);
}

return data ;
    }

}