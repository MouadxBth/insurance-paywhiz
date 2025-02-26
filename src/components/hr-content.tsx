import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, FileText, Calendar, DollarSign } from "lucide-react";
import { ReactNode } from "react";

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">HR Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Employees" value="1,234" icon={<UserPlus />} />
        <MetricCard title="Open Positions" value="15" icon={<FileText />} />
        <MetricCard title="Upcoming Reviews" value="23" icon={<Calendar />} />
        <MetricCard
          title="Payroll Budget"
          value="$1.2M"
          icon={<DollarSign />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  action: "New Hire",
                  employee: "John Doe",
                  date: "2023-06-15",
                },
                {
                  action: "Promotion",
                  employee: "Jane Smith",
                  date: "2023-06-14",
                },
                {
                  action: "Leave Request",
                  employee: "Bob Johnson",
                  date: "2023-06-13",
                },
              ].map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.employee}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>Add Employee</Button>
          <Button variant="outline">Review Requests</Button>
          <Button variant="outline">Generate Reports</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
