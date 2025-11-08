import { useState } from 'react';
import { Button } from './components/ui/button';
import { PawPrint, Bell, LogOut, User } from 'lucide-react';
import ShelterManagerDashboard from './components/ShelterManagerDashboard';
import VeterinarianDashboard from './components/VeterinarianDashboard';
import AdopterPortal from './components/AdopterPortal';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { Badge } from './components/ui/badge';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import Footer from './components/Footer';
import Header from './components/Header';

interface UserData {
  name: string;
  email: string;
  role: 'shelter' | 'vet' | 'adopter' | 'admin';
}

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (role: 'shelter' | 'vet' | 'adopter' | 'admin', userData: { name: string; email: string }) => {
    setUser({
      ...userData,
      role
    });

  };

  const handleLogout = () => {
    setUser(null);
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'shelter':
        return 'Shelter Manager';
      case 'vet':
        return 'Veterinarian';
      case 'adopter':
        return 'Adopter';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'shelter':
        return 'bg-[#1ABC9C] text-white';
      case 'vet':
        return 'bg-[#E67E22] text-white';
      case 'adopter':
        return 'bg-[#3498DB] text-white';
      case 'admin':
        return 'bg-[#9B59B6] text-white';
      default:
        return 'bg-[#7F8C8D] text-white';
    }
  };


   return (
    <Router>
   
      {!user ? (
        <Routes>
          <Route
            path="/loginorregister"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route path="*" element={<Navigate to="/loginorregister" />} />
        </Routes>
      ) : (
      
        <div className="min-h-screen bg-[#ECF0F1] flex flex-col">
          <Header
            user={user}
            getRoleColor={getRoleColor}
            getRoleName={getRoleName}
            handleLogout={handleLogout}
          />

          <main className="flex-1 container mx-auto px-4 py-6">
            <Routes>
          
              {/* <Route path="/" element={<Navigate to={`/${user.role}`} />} /> */}

              
              <Route path="/shelter" element={<ShelterManagerDashboard />} />
              <Route path="/vet" element={<VeterinarianDashboard />} />
              <Route path="/adopter" element={<AdopterPortal />} />
              <Route path="/admin" element={<AdminPanel />} />

             
              <Route path="*" element={<Navigate to={`/${user.role}`} />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </Router>
  )
}
