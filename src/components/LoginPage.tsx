import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PawPrint, Heart, Users, Shield, Stethoscope } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (role: 'shelter' | 'vet' | 'adopter' | 'admin', userData: { name: string; email: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'shelter' | 'vet' | 'adopter' | 'admin'>('adopter');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const roles = [
    {
      id: 'adopter',
      name: 'Adopter',
      icon: Heart,
      color: 'text-[#3498DB]',
      bgColor: 'bg-[#3498DB]/10',
      description: 'Looking to adopt a pet'
    },
    {
      id: 'shelter',
      name: 'Shelter Manager',
      icon: PawPrint,
      color: 'text-[#1ABC9C]',
      bgColor: 'bg-[#1ABC9C]/10',
      description: 'Manage shelter operations'
    },
    {
      id: 'vet',
      name: 'Veterinarian',
      icon: Stethoscope,
      color: 'text-[#E67E22]',
      bgColor: 'bg-[#E67E22]/10',
      description: 'Medical care provider'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      color: 'text-[#9B59B6]',
      bgColor: 'bg-[#9B59B6]/10',
      description: 'System administration'
    }
  ];
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login 
    onLogin(selectedRole, {
      name: 'Demo User',
      email: loginEmail
    });
    navigate(`/${selectedRole}`)
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup 
    onLogin(selectedRole, {
      name: signupName,
      email: signupEmail
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1ABC9C] to-[#2C3E50] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="bg-white p-4 rounded-xl">
              <PawPrint className="h-12 w-12 text-[#1ABC9C]" />
            </div>
            <div>
              <h1 className="text-white">PawsCare</h1>
              <p className="text-[#ECF0F1]">Animal Vaccination & Adoption Management</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="bg-[#1ABC9C] p-2 rounded-lg mt-1">
                <PawPrint className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Comprehensive Animal Management</h3>
                <p className="text-sm text-[#ECF0F1]">
                  Track animal profiles, medical records, and adoption status all in one place
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="bg-[#E67E22] p-2 rounded-lg mt-1">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Vaccination Tracking</h3>
                <p className="text-sm text-[#ECF0F1]">
                  Never miss a vaccination with automated reminders and scheduling
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="bg-[#3498DB] p-2 rounded-lg mt-1">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Streamlined Adoption Process</h3>
                <p className="text-sm text-[#ECF0F1]">
                  Connect animals with loving homes through our efficient application system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="bg-[#1ABC9C] p-3 rounded-xl">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-[#2C3E50]">Welcome to PawsCare</CardTitle>
            <CardDescription>Sign in or create an account to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#ECF0F1]">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Select Your Role</Label>
                    <RadioGroup value={selectedRole} onValueChange={(value: any) => setSelectedRole(value as any)}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((role) => (
                          <label
                            key={role.id}
                            className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedRole === role.id
                                ? 'border-[#1ABC9C] bg-[#1ABC9C]/5'
                                : 'border-[#BDC3C7] hover:border-[#1ABC9C]/50'
                            }`}
                          >
                            <RadioGroupItem value={role.id} id={role.id} />
                            <div className="flex items-center gap-2 flex-1">
                              <div className={`${role.bgColor} p-2 rounded`}>
                                <role.icon className={`h-4 w-4 ${role.color}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#2C3E50]">{role.name}</p>
                                <p className="text-xs text-[#7F8C8D]">{role.description}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full bg-[#1ABC9C] hover:bg-[#16a085]">
                    Sign In
                  </Button>

                  <div className="text-center">
                    <a href="#" className="text-sm text-[#1ABC9C] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Select Your Role</Label>
                    <RadioGroup value={selectedRole} onValueChange={(value: any) => setSelectedRole(value as any)}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((role) => (
                          <label
                            key={role.id}
                            className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedRole === role.id
                                ? 'border-[#1ABC9C] bg-[#1ABC9C]/5'
                                : 'border-[#BDC3C7] hover:border-[#1ABC9C]/50'
                            }`}
                          >
                            <RadioGroupItem value={role.id} id={`signup-${role.id}`} />
                            <div className="flex items-center gap-2 flex-1">
                              <div className={`${role.bgColor} p-2 rounded`}>
                                <role.icon className={`h-4 w-4 ${role.color}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#2C3E50]">{role.name}</p>
                                <p className="text-xs text-[#7F8C8D]">{role.description}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full bg-[#1ABC9C] hover:bg-[#16a085]">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
