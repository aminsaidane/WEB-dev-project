import { mockAnimals, mockVaccinations, mockAppointments, Vaccination, Appointment } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Syringe, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calendar as CalendarComponent } from './ui/calendar';
import { useState } from 'react';

export default function VeterinarianDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingVaccinations = mockVaccinations.filter(v => v.status === 'Due Soon' || v.status === 'Overdue');
  const completedVaccinations = mockVaccinations.filter(v => v.status === 'Completed');
  const upcomingAppointments = mockAppointments.filter(a => a.status === 'Scheduled');

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'text-[#3498DB]',
      bgColor: 'bg-[#3498DB]/10'
    },
    {
      title: 'Vaccinations Due',
      value: upcomingVaccinations.length,
      icon: AlertCircle,
      color: 'text-[#F39C12]',
      bgColor: 'bg-[#F39C12]/10'
    },
    {
      title: 'Completed This Week',
      value: 8,
      icon: CheckCircle,
      color: 'text-[#27AE60]',
      bgColor: 'bg-[#27AE60]/10'
    },
    {
      title: 'Medical Records',
      value: mockAnimals.length,
      icon: FileText,
      color: 'text-[#9B59B6]',
      bgColor: 'bg-[#9B59B6]/10'
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

      {/* Main Content */}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#ECF0F1]">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">Upcoming Appointments</h3>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Veterinarian</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell>
                        <div>
                          <div className="text-[#2C3E50]">{new Date(apt.date).toLocaleDateString()}</div>
                          <div className="text-sm text-[#7F8C8D]">{apt.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{apt.animalName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          apt.type === 'Vaccination' ? 'bg-[#1ABC9C]/10 text-[#1ABC9C]' :
                          apt.type === 'Surgery' ? 'bg-[#E74C3C]/10 text-[#E74C3C]' :
                          'bg-[#3498DB]/10 text-[#3498DB]'
                        }>
                          {apt.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{apt.veterinarian}</TableCell>
                      <TableCell className="max-w-xs truncate">{apt.notes}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" className="bg-[#27AE60] hover:bg-[#229954]">Complete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Due Soon / Overdue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                  <AlertCircle className="h-5 w-5 text-[#F39C12]" />
                  Vaccinations Due ({upcomingVaccinations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingVaccinations.map((vac) => {
                  const animal = mockAnimals.find(a => a.id === vac.animalId);
                  return (
                    <div key={vac.id} className="p-3 border border-[#BDC3C7] rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-[#2C3E50]">{animal?.name}</h4>
                          <p className="text-sm text-[#7F8C8D]">{animal?.breed}</p>
                        </div>
                        <Badge className={
                          vac.status === 'Overdue' ? 'bg-[#E74C3C] text-white' : 'bg-[#F39C12] text-white'
                        }>
                          {vac.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <p className="text-[#7F8C8D]">Vaccine</p>
                          <p className="text-[#2C3E50]">{vac.vaccineName}</p>
                        </div>
                        <div>
                          <p className="text-[#7F8C8D]">Due Date</p>
                          <p className="text-[#2C3E50]">{new Date(vac.nextDueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-[#1ABC9C] hover:bg-[#16a085]">
                        <Syringe className="h-4 w-4 mr-2" />
                        Administer
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Vaccine Inventory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                  <Syringe className="h-5 w-5 text-[#1ABC9C]" />
                  Vaccine Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vaccine</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>DHPP</TableCell>
                      <TableCell>24 doses</TableCell>
                      <TableCell><Badge className="bg-[#27AE60] text-white">In Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rabies</TableCell>
                      <TableCell>18 doses</TableCell>
                      <TableCell><Badge className="bg-[#27AE60] text-white">In Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>FVRCP</TableCell>
                      <TableCell>15 doses</TableCell>
                      <TableCell><Badge className="bg-[#27AE60] text-white">In Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bordetella</TableCell>
                      <TableCell>5 doses</TableCell>
                      <TableCell><Badge className="bg-[#F39C12] text-white">Low Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>RHD</TableCell>
                      <TableCell>8 doses</TableCell>
                      <TableCell><Badge className="bg-[#27AE60] text-white">In Stock</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Recent Vaccinations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Recently Completed Vaccinations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Animal</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Date Administered</TableHead>
                    <TableHead>Next Due Date</TableHead>
                    <TableHead>Veterinarian</TableHead>
                    <TableHead>Batch Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedVaccinations.slice(0, 5).map((vac) => {
                    const animal = mockAnimals.find(a => a.id === vac.animalId);
                    return (
                      <TableRow key={vac.id}>
                        <TableCell>{animal?.name}</TableCell>
                        <TableCell>{vac.vaccineName}</TableCell>
                        <TableCell>{new Date(vac.dateAdministered).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(vac.nextDueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{vac.veterinarian}</TableCell>
                        <TableCell className="text-[#7F8C8D]">{vac.batchNumber}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[#2C3E50]">Medical Records</h3>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnimals.map((animal) => (
              <Card key={animal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={animal.imageUrl} 
                      alt={animal.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-[#2C3E50]">{animal.name}</h4>
                      <p className="text-sm text-[#7F8C8D]">{animal.breed}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#7F8C8D]">
                          <Syringe className="h-3 w-3" />
                          <span>{animal.vaccinations.length} vaccinations</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#7F8C8D]">
                          <FileText className="h-3 w-3" />
                          <span>{animal.medicalHistory.length} records</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View Full Record
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">
                  Schedule for {date?.toLocaleDateString() || 'Today'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3 border border-[#BDC3C7] rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="bg-[#1ABC9C]/10 p-2 rounded">
                          <Clock className="h-5 w-5 text-[#1ABC9C]" />
                        </div>
                        <div>
                          <h4 className="text-[#2C3E50]">{apt.time} - {apt.animalName}</h4>
                          <p className="text-sm text-[#7F8C8D]">{apt.type} with {apt.veterinarian}</p>
                          <p className="text-sm text-[#7F8C8D] mt-1">{apt.notes}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#3498DB]/10 text-[#3498DB]">
                        {apt.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <p className="text-center text-[#7F8C8D] py-8">No appointments scheduled for this date</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
