import React from 'react';
import { createClient } from "@/utils/supabase/server";

export default async function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();
const { data, error } = await supabase.from("employees").select("*").eq("emp_id", id);
  console.log(data)
  return (
    <div>
      {!data || data.length === 0 ? <h1>No employee with this id exists</h1> : <pre>Employee: {JSON.stringify(data)}</pre>}
      
    </div>
  );
}