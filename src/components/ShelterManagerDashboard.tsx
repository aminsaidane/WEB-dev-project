import { mockAnimals, mockApplications, analyticsData, Animal, AdoptionApplication } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { PawPrint, Users, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import AnimalCard from './AnimalCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export default function ShelterManagerDashboard() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const COLORS = ['#1ABC9C', '#3498DB', '#9B59B6', '#E67E22'];

  const stats = [
    {
      title: 'Total Animals',
      value: analyticsData.totalAnimals,
      icon: PawPrint,
      color: 'text-[#1ABC9C]',
      bgColor: 'bg-[#1ABC9C]/10'
    },
    {
      title: 'Available for Adoption',
      value: analyticsData.availableForAdoption,
      icon: CheckCircle,
      color: 'text-[#27AE60]',
      bgColor: 'bg-[#27AE60]/10'
    },
    {
      title: 'Adopted This Month',
      value: analyticsData.adoptedThisMonth,
      icon: TrendingUp,
      color: 'text-[#3498DB]',
      bgColor: 'bg-[#3498DB]/10'
    },
    {
      title: 'Pending Applications',
      value: analyticsData.pendingApplications,
      icon: Clock,
      color: 'text-[#F39C12]',
      bgColor: 'bg-[#F39C12]/10'
    }
  ];

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

      {/* Shelter Capacity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
            <AlertCircle className="h-5 w-5 text-[#E67E22]" />
            Shelter Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#7F8C8D]">
                {analyticsData.shelterCapacity.current} / {analyticsData.shelterCapacity.maximum} animals
              </span>
              <span className="text-[#2C3E50]">{analyticsData.shelterCapacity.percentage}%</span>
            </div>
            <Progress value={analyticsData.shelterCapacity.percentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#ECF0F1]">
          <TabsTrigger value="animals">Animal Inventory</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">All Animals ({mockAnimals.length})</h3>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]">
              <PawPrint className="h-4 w-4 mr-2" />
              Add New Animal
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnimals.map(animal => (
              <AnimalCard 
                key={animal.id} 
                animal={animal}
                onViewDetails={setSelectedAnimal}
                showActions={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">Adoption Applications</h3>
            <div className="flex gap-2">
              <Badge variant="outline">Pending: {mockApplications.filter(a => a.status === 'Pending Review').length}</Badge>
              <Badge variant="outline" className="bg-[#27AE60] text-white">Approved: {mockApplications.filter(a => a.status === 'Approved').length}</Badge>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Animal</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.animalName}</TableCell>
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{app.applicantEmail}</div>
                          <div className="text-[#7F8C8D]">{app.applicantPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(app.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          app.status === 'Approved' ? 'bg-[#27AE60] text-white' :
                          app.status === 'Interview Scheduled' ? 'bg-[#3498DB] text-white' :
                          app.status === 'Rejected' ? 'bg-[#E74C3C] text-white' :
                          'bg-[#F39C12] text-white'
                        }>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Review</Button>
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
                <CardTitle className="text-[#2C3E50]">Adoptions by Month</CardTitle>
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
                <CardTitle className="text-[#2C3E50]">Animals by Species</CardTitle>
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
          </div>
        </TabsContent>
      </Tabs>

      {/* Animal Details Dialog */}
      <Dialog open={!!selectedAnimal} onOpenChange={() => setSelectedAnimal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">{selectedAnimal?.name}</DialogTitle>
          </DialogHeader>
          {selectedAnimal && (
            <div className="space-y-4">
              <img 
                src={selectedAnimal.imageUrl} 
                alt={selectedAnimal.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Species</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.species}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Breed</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Age</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.age}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Weight</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.weight}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">Medical History</p>
                <ul className="list-disc list-inside text-[#2C3E50] space-y-1">
                  {selectedAnimal.medicalHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">Vaccinations</p>
                <div className="space-y-2">
                  {selectedAnimal.vaccinations.length > 0 ? (
                    selectedAnimal.vaccinations.map((vac) => (
                      <div key={vac.id} className="flex justify-between items-center p-2 bg-[#ECF0F1] rounded">
                        <span className="text-[#2C3E50]">{vac.vaccineName}</span>
                        <Badge className={
                          vac.status === 'Completed' ? 'bg-[#27AE60] text-white' :
                          vac.status === 'Due Soon' ? 'bg-[#F39C12] text-white' :
                          'bg-[#E74C3C] text-white'
                        }>
                          {vac.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#7F8C8D]">No vaccination records</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
