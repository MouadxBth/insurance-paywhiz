"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    department: "Sales",
    team: "Enterprise",
    office: "New York",
    status: "Unselected",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Marketing",
    team: "Digital",
    office: "San Francisco",
    status: "Selected/not Finalized",
  },
  {
    id: 3,
    name: "Bob Johnson",
    department: "Engineering",
    team: "Frontend",
    office: "London",
    status: "Finalized",
  },
  // Add more mock employees as needed
];

export function BenefitsManagement() {
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [office, setOffice] = useState("");
  const [benefitYear, setBenefitYear] = useState("");
  const [filter, setFilter] = useState("All");
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const handleFilter = () => {
    const filtered = mockEmployees.filter(
      (employee) =>
        (department === "" || employee.department === department) &&
        (team === "" || employee.team === team) &&
        (office === "" || employee.office === office) &&
        (filter === "All" || employee.status === filter)
    );
    setEmployees(filtered);
  };

  const handleSendReminders = () => {
    console.log("Sending reminders to:", selectedEmployees);
    alert(`Reminders sent to ${selectedEmployees.length} employees`);
  };

  const toggleEmployeeSelection = (employeeId: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Insurance Selection Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="team">Team</Label>
            <Select onValueChange={setTeam}>
              <SelectTrigger id="team">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Digital">Digital</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="office">Office</Label>
            <Select onValueChange={setOffice}>
              <SelectTrigger id="office">
                <SelectValue placeholder="Select office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="London">London</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="benefitYear">Benefit Year</Label>
            <Input
              id="benefitYear"
              type="number"
              placeholder="Enter benefit year"
              value={benefitYear}
              onChange={(e) => setBenefitYear(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Select onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Unselected">Unselected</SelectItem>
              <SelectItem value="Selected/not Finalized">
                Selected/not Finalized
              </SelectItem>
              <SelectItem value="Finalized">Finalized</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleFilter}>Apply Filters</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Office</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedEmployees.includes(employee.id)}
                    onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                    disabled={employee.status === "Finalized"}
                  />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.team}</TableCell>
                <TableCell>{employee.office}</TableCell>
                <TableCell>{employee.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSendReminders}>
            Send Reminder Email to Checked
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
