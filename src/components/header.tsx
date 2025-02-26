import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center">
        <Input type="search" placeholder="Search..." className="w-64 mr-4" />
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="ml-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            className="rounded-full"
          />
        </Button>
      </div>
    </header>
  );
}
