import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Badge, Bell, LogOut, PawPrint, User } from 'lucide-react'
import { Button } from './ui/button'


interface HeaderProps {
 user:{ name: string;
  email: string;
  role: 'shelter' | 'vet' | 'adopter' | 'admin';},
getRoleColor : (role:string)=>string,
getRoleName : (role:string)=> string,
handleLogout : ()=> void
}

export default function Header({user ,getRoleColor,getRoleName,handleLogout}: HeaderProps) {
  return (
    
      <header className="bg-[#2C3E50] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#1ABC9C] p-2 rounded-lg">
                <PawPrint className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-white">PawsCare</h1>
                <p className="text-sm text-[#ECF0F1]">Animal Vaccination & Adoption Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-white hover:bg-[#34495E] relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-[#E67E22] rounded-full"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-[#34495E] gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="text-[#2C3E50]">{user.name}</p>
                      <p className="text-sm text-[#7F8C8D]">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleName(user.role)}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-[#E74C3C]">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    
  )
}
