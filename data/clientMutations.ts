import { createClient as createClientBrowser } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
export const MUTATIONS ={
deleteEmployee: async (emp_id: number) => {
    const supabase = createClientBrowser() ;
    const {data ,error} = await supabase
    .from('employees')
    .delete()
    .eq('emp_id', emp_id)
    .select()
    if (error) {
        console.error(error);
        throw new Error(`Error executing query: ${error.message}`);
    }
    
    return data ;
}

}