import { Home, Users, FileText, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold">HR Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {[
            { name: "Dashboard", icon: Home, href: "/" },
            { name: "Employees", icon: Users, href: "/employees" },
            { name: "Benefits", icon: Heart, href: "/benefits" },
            { name: "Policies", icon: FileText, href: "/policies" },
            { name: "Settings", icon: Settings, href: "/settings" },
          ].map((item) => (
            <li key={item.name}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  item.name === "Dashboard" && "bg-gray-100"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
