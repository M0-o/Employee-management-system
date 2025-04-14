import {createClient } from "@/utils/supabase/server";

const supabase = await createClient();

export const QUERIES = {
    getPerformanceRatingByDepartment: async () => {
        const { data, error } = await supabase.rpc("performance_rating_average_by_param",{param:"department_type"})
        if (error) console.error(error);
        return data;
    },
    getNumberOfDepartments: async () => {
        const { data, error } = await supabase.rpc("number_of_departments");
        if (error) console.error(error);
        return data;
    },
    getNumberOfPositions: async () => {
        const { data, error } = await supabase.rpc("number_of_positions");
        if (error) console.error(error);
        return data;
    },

}