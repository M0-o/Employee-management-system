import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MailIcon, MapPinIcon, BuildingIcon, UserIcon, BriefcaseIcon, StarIcon } from "lucide-react"
import type {Employee} from "@/app/employees/columns"

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A"
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper function to display value or N/A if null
function displayValue(value: any): string {
  if (value === null || value === undefined) return "N/A"
  return String(value)
}
type ParamsWithId = Promise<any> & {
  id: string
}
export default async function EmployeeDetailsPage({
  params,
}: {
  params: ParamsWithId
}) {
  const id = (await params).id ;
  const supabase = await createClient();
  const { data , error } = await supabase.from("employees").select("*").eq("emp_id", id);

const employee: Employee | null = data ? data[0] : null;

  if (!employee) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage
                src={`/placeholder.svg?height=96&width=96`}
                alt={`${employee.first_name} ${employee.last_name}`}
              />
              <AvatarFallback className="text-2xl">
                {employee.first_name.charAt(0)}
                {employee.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">
              {employee.first_name} {employee.last_name}
            </CardTitle>
            <p className="text-muted-foreground">{displayValue(employee.job_function_desc)}</p>
            <div className="mt-2">
              <Badge variant={employee.employee_status === "Active" ? "default" : "destructive"}>
                {employee.employee_status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>Reports to: {displayValue(employee.supervisor)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>State: {displayValue(employee.state)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                <span>Location Code: {displayValue(employee.location_code)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>Birthdate: {formatDate(employee.birthdate)}</span>
              </div>
              {employee.current_employee_rating && (
                <div className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                  <span>Rating: {employee.current_employee_rating.toFixed(1)}/5.0</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employee Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5" />
                  Employment Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Employee ID:</span>
                    <span>{employee.emp_id}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{formatDate(employee.start_date)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Exit Date:</span>
                    <span>{formatDate(employee.exit_date)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Employee Type:</span>
                    <span>{employee.employee_type}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Classification:</span>
                    <span>{employee.employee_classification}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Pay Zone:</span>
                    <span>{employee.payzone}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Job Title ID:</span>
                    <span>{displayValue(employee.job_title_id)}</span>
                  </div>
                </div>
              </div>

              {/* Department Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5" />
                  Department Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Business Unit:</span>
                    <span>{employee.business_unit}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{displayValue(employee.department_type)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Division:</span>
                    <span>{displayValue(employee.division)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Job Function:</span>
                    <span>{displayValue(employee.job_function_desc)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Performance & Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <StarIcon className="h-5 w-5" />
                  Performance Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Performance Score:</span>
                    <span>{displayValue(employee.performance_score)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Current Rating:</span>
                    <span>
                      {employee.current_employee_rating ? `${employee.current_employee_rating.toFixed(1)}/5.0` : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{displayValue(employee.gender_code)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Race:</span>
                    <span>{displayValue(employee.race)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Marital Status:</span>
                    <span>{displayValue(employee.marital_status)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Termination Information (only shown if applicable) */}
            {employee.termination_type && (
              <>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Termination Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Termination Type:</span>
                      <span>{employee.termination_type}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Description:</span>
                      <span>{displayValue(employee.termination_description)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

