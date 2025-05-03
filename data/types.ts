

export interface T_Employee  {
    emp_id: number
    first_name: string
    last_name: string
    start_date: string
    exit_date: string | null
    supervisor: string | null
    email: string
    business_unit: string
    employee_status: string
    employee_type: string
    payzone: string
    employee_classification: string
    termination_type: string | null
    termination_description: string | null
    department_type: string | null
    division: string | null
    birthdate: string | null
    state: string | null
    job_function_desc: string | null
    gender_code: string | null
    location_code: number | null
    race: string | null
    marital_status: string | null
    performance_score: string | null
    current_employee_rating: number | null
    job_title_id: number | null
  }


export interface PerformanceData {
    score: string;
    performance_score: string;
    percentage: number;
    number_of_employees?: number;
}

export interface DepartmentPerformance {
    department_type: string;
    average_rating: number;
    group_?: string;
}

export interface growthDataItem {
  date: string
  hires: number
  terminations: number
}

export interface employeeDistributionByGender{
  gender : string ;
  number : number ;
  percentage : number ;
}

export interface employeeDistributionByRace{
  race : string ;
  number : number ;
  percentage : number ;
}

export interface payzonePerformance {
  payzone: string;
  average_rating: number;
  group_?: string;
}

export interface basicEmployeeInfo {
  first_name: string;
  last_name: string;
  performance_score: string;
}