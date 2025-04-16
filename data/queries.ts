import { createClient } from "@/lib/supabase/server";
import { DepartmentPerformance, growthDataItem, PerformanceData } from "@/data/types";


const executeQuery = async <T>(queryFn: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<{ data: T | null; error: any }>) => {
    const supabase = await createClient();
    const { data, error } = await queryFn(supabase);
    if (error) {
        console.error(error);
        throw new Error(`Error executing query: ${error.message}`);
    }
    return data;
};

export const QUERIES = {

    getPerformanceRatingByDepartment: () =>
        executeQuery<DepartmentPerformance[]>(async supabase =>
            await supabase.rpc("performance_rating_average_by_param", { param: "department_type" })
        ),

    getPerformanceScoresPercentages: () =>
        executeQuery<PerformanceData[]>(async supabase =>
            await supabase.rpc("performance_score_percentage")
        ),

    getEmployeeRatingAverage: () =>
        executeQuery<number>(async supabase =>
            await supabase.rpc("employee_rating_average")
        ),

    getEmployee: (id: number) =>
        executeQuery(async supabase => {
            const { data, error } = await supabase
                .from("employees")
                .select("*")
                .eq("emp_id", id)
                .single(); 
            
            return { data, error };
        }),

    getEmployees: () => 
        executeQuery(async supabase => {
            const { data, error } = await supabase
                .from("employees")
                .select("*")
                .order("emp_id", { ascending: true });
            
            return { data, error };
        }
    ),

    getGrowthTrends: () =>
        executeQuery<growthDataItem[]>(async supabase =>
            await supabase.rpc("get_employee_start_exit_counts")
        ),

    getEmployeeCount: () =>
        executeQuery<number>(async supabase =>
            await supabase.rpc("number_of_employees")
        ),
};