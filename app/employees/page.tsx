import { createClient } from "@/utils/supabase/server";

export default async function Employees() {
  const supabase = await createClient();
  const { data: employees } = await supabase
    .from("employees")
    .select("first_name, last_name")
    .limit(10);

  return <pre>{JSON.stringify(employees, null, 2)}</pre>;
}
