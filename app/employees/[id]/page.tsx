import *  as Employee from "./imports";
import {QUERIES} from "@/data/queries"

type ParamsWithId = Promise<any> & {
  id: string
}

export default async function EmployeeDetailsPage({
  params,
}: {
  params: ParamsWithId
}) {
  const id:number = (await params).id;
  const employee = await QUERIES.getEmployee(id);

  if (!employee) {
    Employee.notFound()
  }

  console.log("termination type", employee.termination_type);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Profile Card */}
        <Employee.Card className="lg:col-span-1">
          <Employee.CardHeader className="text-center">
            <Employee.Avatar className="w-24 h-24 mx-auto mb-4">
              <Employee.AvatarImage
                src={`/placeholder.svg?height=96&width=96`}
                alt={`${employee.first_name} ${employee.last_name}`}
              />
              <Employee.AvatarFallback className="text-2xl">
                {employee.first_name.charAt(0)}
                {employee.last_name.charAt(0)}
              </Employee.AvatarFallback>
            </Employee.Avatar>
            <Employee.CardTitle className="text-2xl font-bold">
              {employee.first_name} {employee.last_name}
            </Employee.CardTitle>
            <p className="text-muted-foreground">{Employee.displayValue(employee.job_function_desc)}</p>
            <div className="mt-2">
              <Employee.Badge variant={employee.employee_status === "Active" ? "default" : "destructive"}>
                {employee.employee_status}
              </Employee.Badge>
            </div>
          </Employee.CardHeader>
          <Employee.CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Employee.MailIcon className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Employee.UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>Reports to: {Employee.displayValue(employee.supervisor)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Employee.MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>State: {Employee.displayValue(employee.state)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Employee.BuildingIcon className="h-4 w-4 text-muted-foreground" />
                <span>Location Code: {Employee.displayValue(employee.location_code)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Employee.CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>Birthdate: {Employee.formatDate(employee.birthdate)}</span>
              </div>
              {employee.current_employee_rating && (
                <div className="flex items-center gap-2">
                  <Employee.StarIcon className="h-4 w-4 text-yellow-500" />
                  <span>Rating: {employee.current_employee_rating.toFixed(1)}/5.0</span>
                </div>
              )}
            </div>
          </Employee.CardContent>
        </Employee.Card>

        {/* Employee Details Card */}
        <Employee.Card className="lg:col-span-2">
          <Employee.CardHeader>
            <Employee.CardTitle>Employment Details</Employee.CardTitle>
          </Employee.CardHeader>
          <Employee.CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Employee.BriefcaseIcon className="h-5 w-5" />
                  Employment Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Employee ID:</span>
                    <span>{employee.emp_id}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{Employee.formatDate(employee.start_date)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Exit Date:</span>
                    <span>{Employee.formatDate(employee.exit_date)}</span>
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
                    <span>{Employee.displayValue(employee.job_title_id)}</span>
                  </div>
                </div>
              </div>

              {/* Department Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Employee.BuildingIcon className="h-5 w-5" />
                  Department Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Business Unit:</span>
                    <span>{employee.business_unit}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{Employee.displayValue(employee.department_type)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Division:</span>
                    <span>{Employee.displayValue(employee.division)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Job Function:</span>
                    <span>{Employee.displayValue(employee.job_function_desc)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Employee.Separator className="my-6" />

            {/* Performance & Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Employee.StarIcon className="h-5 w-5" />
                  Performance Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Performance Score:</span>
                    <span>{Employee.displayValue(employee.performance_score)}</span>
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
                  <Employee.UserIcon className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{Employee.displayValue(employee.gender_code)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Race:</span>
                    <span>{Employee.displayValue(employee.race)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Marital Status:</span>
                    <span>{Employee.displayValue(employee.marital_status)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Termination Information (only shown if applicable) */}
            {employee.termination_type != "Unk"  && (
              <>
                <Employee.Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Termination Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Termination Type:</span>
                      <span>{employee.termination_type}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Description:</span>
                      <span>{Employee.displayValue(employee.termination_description)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Employee.CardContent>
        </Employee.Card>
      </div>
    </div>
  )
}

