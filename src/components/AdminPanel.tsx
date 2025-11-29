import { analyticsData } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Settings, BarChart3, Shield, Database, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios';
 interface User {
  _id: string;          // MongoDB ObjectId as string
  fullName: string;
  email: string;
  role: 'adopter' | 'vet' | 'shelter' | 'admin';
  lastLogin: string;    // format: "YYYY-MM-DD"
}

export default function AdminPanel() {
  const COLORS = ['#1ABC9C', '#3498DB', '#9B59B6', '#E67E22'];
  const [users, setUsers] = useState<User[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'adopter' as 'adopter' | 'vet' | 'shelter' | 'admin',
    password: ''
  });
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);
  
  const systemLogs = [
    { id: 1, timestamp: '2025-11-01 14:32:15', user: 'Dr. Sarah Mitchell', action: 'Administered vaccination', details: 'DHPP for Max (A001)' },
    { id: 2, timestamp: '2025-11-01 14:15:22', user: 'Jennifer Williams', action: 'Updated animal profile', details: 'Modified status for Bella (A003)' },
    { id: 3, timestamp: '2025-11-01 13:45:10', user: 'System', action: 'Automated reminder sent', details: 'Vaccination due for 3 animals' },
    { id: 4, timestamp: '2025-11-01 12:30:05', user: 'Dr. Michael Chen', action: 'Generated certificate', details: 'Vaccination certificate for Luna (A002)' },
    { id: 5, timestamp: '2025-11-01 11:20:18', user: 'Jennifer Williams', action: 'Approved adoption application', details: 'Application APP003 approved' },
  ];

  const financialData = [
    { month: 'May', donations: 12500, expenses: 8300, adoptionFees: 3200 },
    { month: 'Jun', donations: 15200, expenses: 9100, adoptionFees: 4000 },
    { month: 'Jul', donations: 18300, expenses: 10200, adoptionFees: 5500 },
    { month: 'Aug', donations: 14800, expenses: 9800, adoptionFees: 4200 },
    { month: 'Sep', donations: 16500, expenses: 10500, adoptionFees: 5100 },
    { month: 'Oct', donations: 19200, expenses: 11000, adoptionFees: 4800 },
  ];

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-[#3498DB]',
      bgColor: 'bg-[#3498DB]/10'
    },
    {
      title: 'Active Sessions',
      value: 12,
      icon: Activity,
      color: 'text-[#27AE60]',
      bgColor: 'bg-[#27AE60]/10'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: Shield,
      color: 'text-[#1ABC9C]',
      bgColor: 'bg-[#1ABC9C]/10'
    },
    {
      title: 'Database Size',
      value: '2.4 GB',
      icon: Database,
      color: 'text-[#9B59B6]',
      bgColor: 'bg-[#9B59B6]/10'
    }
  ];

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setEditDialogOpen(true);
  };

const handleSaveUser = async () => {
  if (!editedUser) return;

  try {
    const res = await axios.put(
      `http://localhost:5000/auth/users/${editedUser._id}`,
      editedUser,
      { withCredentials: true }
    );

    // Update local state
    const updated = res.data;
    const index = users.findIndex(u => u._id === updated._id);

    if (index !== -1) {
      const newUsers = [...users];
      newUsers[index] = updated;
      setUsers(newUsers);
    }

    setEditDialogOpen(false);

  } catch (err) {
    console.error("Error updating user", err);
  }
};

const handleAddUser = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/users",
      newUser,
      { withCredentials: true }
    );

    const createdUser = res.data.user;

    // Add new user to UI
    setUsers((prev) => [...prev, createdUser]);

 

    // Reset form
    setNewUser({
      fullName: "",
      email: "",
      role: "adopter",
      password: ""
    });

    setAddDialogOpen(false);

  } catch (err: any) {
    console.error(err);
   
  }
};

const handleDeleteUser = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/auth/users/${id}`);
    setUsers(prev => prev.filter(user => user._id !== id));
  } catch (err) {
    console.error("Failed to delete user:", err);
  }
};
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D] mb-1">{stat.title}</p>
                  <h3 className="text-[#2C3E50]">{stat.value}</h3>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#ECF0F1]">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">User Accounts</h3>
            <Button onClick={()=>{setAddDialogOpen(true)}} className="bg-[#1ABC9C] hover:bg-[#16a085]">
              <Users className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          user.role === 'vet' ? 'bg-[#1ABC9C]/10 text-[#1ABC9C]' :
                          user.role === 'shelter' ? 'bg-[#3498DB]/10 text-[#3498DB]' :
                          user.role === 'admin' ? 'bg-[#9B59B6]/10 text-[#9B59B6]' :
                          'bg-[#E67E22]/10 text-[#E67E22]'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin ? user.lastLogin:"Never"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button onClick={() => handleEditUser(user)} size="sm" variant="outline">Edit</Button>
                          <Button onClick={()=>{handleDeleteUser(user._id)}} size="sm" variant="outline" className="text-[#E74C3C]">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" />
                    <XAxis dataKey="month" stroke="#7F8C8D" />
                    <YAxis stroke="#7F8C8D" />
                    <Tooltip />
                    <Line type="monotone" dataKey="donations" stroke="#1ABC9C" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#E74C3C" strokeWidth={2} />
                    <Line type="monotone" dataKey="adoptionFees" stroke="#3498DB" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1ABC9C] rounded-full"></div>
                    <span className="text-sm text-[#7F8C8D]">Donations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#E74C3C] rounded-full"></div>
                    <span className="text-sm text-[#7F8C8D]">Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#3498DB] rounded-full"></div>
                    <span className="text-sm text-[#7F8C8D]">Adoption Fees</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Adoption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.adoptionsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" />
                    <XAxis dataKey="month" stroke="#7F8C8D" />
                    <YAxis stroke="#7F8C8D" />
                    <Tooltip />
                    <Bar dataKey="adoptions" fill="#1ABC9C" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Species Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.animalsBySpecies}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ species, count }) => `${species}: ${count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analyticsData.animalsBySpecies.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#7F8C8D]">Total Revenue (Oct)</p>
                    <h4 className="text-[#2C3E50]">$24,000</h4>
                  </div>
                  <div className="p-4 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#7F8C8D]">Total Expenses (Oct)</p>
                    <h4 className="text-[#2C3E50]">$11,000</h4>
                  </div>
                  <div className="p-4 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#7F8C8D]">Net Income (Oct)</p>
                    <h4 className="text-[#27AE60]">$13,000</h4>
                  </div>
                  <div className="p-4 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#7F8C8D]">Avg. Adoption Fee</p>
                    <h4 className="text-[#2C3E50]">$400</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-[#2C3E50]">General Settings</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Email Notifications</Label>
                    <p className="text-sm text-[#7F8C8D]">Send automated emails for vaccinations and appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-[#7F8C8D]">Daily automated database backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Adoption Portal</Label>
                    <p className="text-sm text-[#7F8C8D]">Allow public browsing of available animals</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-[#2C3E50]">Security Settings</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-[#7F8C8D]">Require 2FA for all admin users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-[#7F8C8D]">Auto-logout after 30 minutes of inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-[#2C3E50]">Adoption Settings</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Application Auto-Approval</Label>
                    <p className="text-sm text-[#7F8C8D]">Automatically approve first-time applicants</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Background Check Required</Label>
                    <p className="text-sm text-[#7F8C8D]">Require background checks for all adopters</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-[#1ABC9C] hover:bg-[#16a085]">
                  Save Changes
                </Button>
                <Button variant="outline">
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">Recent Activity</h3>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-[#7F8C8D]">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-[#3498DB]/10 text-[#3498DB]">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#7F8C8D]">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedUser?.fullName || ''}
                onChange={(e) => setEditedUser({ ...editedUser!, fullName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editedUser?.email || ''}
                onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Role</Label>
              <Select
                value={editedUser?.role || ''}
                onValueChange={(value:any) => setEditedUser({ ...editedUser!, role: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adopter">Adopter</SelectItem>
                  <SelectItem value="vet">Veterinarian</SelectItem>
                  <SelectItem value="shelter">Shelter Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveUser}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value:any) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adopter">Adopter</SelectItem>
                  <SelectItem value="vet">Veterinarian</SelectItem>
                  <SelectItem value="shelter">Shelter Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
