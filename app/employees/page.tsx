import { createClient } from "@/utils/supabase/server";

export default async function Employees() {
  const supabase = await createClient();
  const { data: employees } = await supabase
    .from("employees")
    .select("*");

    console.log(employees);
    
  return <pre>{JSON.stringify(employees, null, 2)}</pre>;
}
