"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboard } from "@/components/admin-dashboard"
import { EmployeeDashboard } from "@/components/employee-dashboard"

export default function Dashboard() {
  const [role, setRole] = useState<"admin" | "employee">("admin")

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PayWhiz Insurance Portal</h1>
          <p className="text-muted-foreground">Manage all your insurance needs in one place</p>
        </div>
        <Tabs
          defaultValue={role}
          onValueChange={(value) => setRole(value as "admin" | "employee")}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">HR Admin</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  )
}

