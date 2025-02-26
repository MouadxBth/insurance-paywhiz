"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, CheckCircle, Clock, Download, Mail, Search } from "lucide-react"
import { mockEmployees, mockTrendData, mockPlanDistribution } from "@/lib/mock-data"

export function AdminDashboard() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees.map((e) => e.id))
    }
  }

  const handleSelectEmployee = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id))
    } else {
      setSelectedEmployees([...selectedEmployees, id])
    }
  }

  const handleSendReminders = () => {
    alert(`Reminders sent to ${selectedEmployees.length} employees`)
    setSelectedEmployees([])
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employee Selection</TabsTrigger>
          <TabsTrigger value="configuration">Plan Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockEmployees.length}</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrollment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Selections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">-3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$342</div>
                <p className="text-xs text-muted-foreground">+$18 from last year</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Monthly enrollment rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="auto" fill="#8884d8" />
                    <Bar dataKey="home" fill="#82ca9d" />
                    <Bar dataKey="life" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>Current enrollment by plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockPlanDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockPlanDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Insurance Selection Status</CardTitle>
              <CardDescription>Monitor and manage employee benefit selections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Plans Selected</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No employees found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedEmployees.includes(employee.id)}
                              onCheckedChange={() => handleSelectEmployee(employee.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>
                            {employee.status === "completed" && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle className="mr-1 h-3 w-3" /> Completed
                              </Badge>
                            )}
                            {employee.status === "in-progress" && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                <Clock className="mr-1 h-3 w-3" /> In Progress
                              </Badge>
                            )}
                            {employee.status === "not-started" && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                <AlertCircle className="mr-1 h-3 w-3" /> Not Started
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{employee.lastUpdated}</TableCell>
                          <TableCell>{employee.plansSelected.join(", ")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  {selectedEmployees.length} of {filteredEmployees.length} employees selected
                </div>
                <Button onClick={handleSendReminders} disabled={selectedEmployees.length === 0}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employer-Sponsored Insurance Configuration</CardTitle>
              <CardDescription>Configure employer contributions and group discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="auto-contribution">Auto Insurance Employer Contribution</Label>
                  <div className="flex items-center gap-2">
                    <Input id="auto-contribution" type="number" defaultValue={15} />
                    <span>%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Current group discount: 12% off standard rates</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="home-contribution">Home Insurance Employer Contribution</Label>
                  <div className="flex items-center gap-2">
                    <Input id="home-contribution" type="number" defaultValue={10} />
                    <span>%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Current group discount: 8% off standard rates</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="life-contribution">Life Insurance Employer Contribution</Label>
                  <div className="flex items-center gap-2">
                    <Input id="life-contribution" type="number" defaultValue={25} />
                    <span>%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Current group discount: 15% off standard rates</p>
                </div>

                <div className="grid gap-3">
                  <Label>Eligible Employee Groups</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="full-time" defaultChecked />
                      <label
                        htmlFor="full-time"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Full-time Employees
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="part-time" defaultChecked />
                      <label
                        htmlFor="part-time"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Part-time Employees (20+ hours/week)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contractors" />
                      <label
                        htmlFor="contractors"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Contractors (6+ months tenure)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

