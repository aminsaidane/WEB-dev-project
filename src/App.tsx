import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { PawPrint, Bell, LogOut, User } from 'lucide-react';
import ShelterManagerDashboard from './components/ShelterManagerDashboard';
import VeterinarianDashboard from './components/VeterinarianDashboard';
import AdopterPortal from './components/AdopterPortal';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { Badge } from './components/ui/badge';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    useEffect(() => {
    // Check if user is already logged in via session
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", { withCredentials: true });
        if (res.data.user) {
          setUser({
            name: res.data.user.fullName,
            email: res.data.user.email,
            role: res.data.user.role
          });
        }
      } catch (err) {
        setUser(null);
      } 
    };

    fetchUser();
  }, []);
  const handleLogin = (role: 'shelter' | 'vet' | 'adopter' | 'admin', userData: { name: string; email: string }) => {
    setUser({
      ...userData,
      role
    });

  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
        return 'bg-[#1ABC9C] text-black';
      case 'vet':
        return 'bg-[#E67E22] text-black';
      case 'adopter':
        return 'bg-[#3498DB] text-black';
      case 'admin':
        return 'bg-[#9B59B6] text-black';
      default:
        return 'bg-[#7F8C8D] text-black';
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
              <Route path="/adopter" element={<AdopterPortal user={user} setUser={setUser} />} />
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
