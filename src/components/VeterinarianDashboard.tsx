import {  Vaccination, Appointment,Animal } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Syringe, FileText, AlertCircle, CheckCircle, Clock, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export default function VeterinarianDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mockAnimals, setMockAnimals] = useState<Animal[]>([]);
  const [mockAppointments, setMockAppointments] = useState<Appointment[]>([]);
  const [mockVaccinations, setMockVaccinations] = useState<Vaccination[]>([]);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [viewAnimalDialogOpen, setViewAnimalDialogOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [viewRecordDialogOpen, setViewRecordDialogOpen] = useState(false);
  const [scheduleVaccinationDialogOpen, setScheduleVaccinationDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [upcomingAppointments,setUpcomingAppointments]=  useState<Appointment[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
  const [upcomingVaccinations,setUpcomingVaccinations] = useState<Vaccination[]>([]);
  const [completedVaccinations,setCompletedVaccinations] = useState<Vaccination[]>([]);
  const [vets, setVets] = useState<User[]>([]);
  const [completedThisWeek, setCompletedThisWeek] = useState(0);


   const [newAppt, setNewAppt] = useState({
    animalId: '',
    type: '',
    date: '',
    time: '',
    veterinarian: '',
    vetId:'',
    notes: ''
  });


  const [newVaccination, setNewVaccination] = useState({
    animalId: '',
    vaccineName: '',
    scheduledDate: '',
    veterinarian: '',
    vetId:'',
    batchNumber: '',
    notes: '',
    status: ""
  });
  const handleViewAnimal = (appointmentId: string) => {
    const appointment = mockAppointments.find(a => a._id === appointmentId);
    if (appointment) {
      const animal = mockAnimals.find(a => a._id === appointment.animalId);
      if (animal) {
        setSelectedAnimal(animal);
        setSelectedAppointment(appointment);
        setViewAnimalDialogOpen(true);
      }
    }
  };

const handleScheduleAppointment = async () => {
  try {
    // Validate required fields
    if (!newAppt.animalId || !newAppt.type || !newAppt.date || !newAppt.time) {
      return toast.error("Please fill all required fields");
    }

    // Build appointment object to send to backend
    const apptToCreate = {
      animalId: newAppt.animalId,
      type: newAppt.type,
      date: newAppt.date,          // YYYY-MM-DD
      time: newAppt.time,          // HH:mm
      veterinarian: newAppt.veterinarian,
      vetId: newAppt.vetId || null,
      notes: newAppt.notes,
      status: "Scheduled"
    };

    // Send to backend
    const res = await axios.post("http://localhost:5000/appointments", apptToCreate);

    const createdAppointment = res.data;

    // Update UI list of appointments
    setUpcomingAppointments(prev => [...prev, createdAppointment]);

    toast.success("Appointment scheduled successfully!");

    // Reset form
    setNewAppt({
      animalId: "",
      type: "",
      date: "",
      time: "",
      veterinarian: "",
      vetId: "",
      notes: ""
    });

    setScheduleDialogOpen(false);

  } catch (err) {
    console.error(err);
    toast.error("Failed to schedule appointment");
  }
};
  const handleScheduleVaccination = async () => {
  try {
    // Validate required fields
    if (!newVaccination.animalId || !newVaccination.vaccineName || !newVaccination.scheduledDate) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Prepare payload
    const payload = {
      animalId: newVaccination.animalId,
      vaccineName: newVaccination.vaccineName,
      dateAdministered: newVaccination.scheduledDate, // front-end field -> backend
      nextDueDate: newVaccination.scheduledDate || "",
      veterinarian: newVaccination.veterinarian,
      vetId: newVaccination.vetId,
      batchNumber: newVaccination.batchNumber,
      status: "Due Soon",
    };

    // Send to backend
    const res = await axios.post("http://localhost:5000/vaccinations", payload);

    // Update state with the response from backend
    setUpcomingVaccinations((prev) => [...prev, res.data]);

    toast.success("Vaccination scheduled successfully!");

    // Close dialog and reset form
    setScheduleVaccinationDialogOpen(false);
    setNewVaccination({
     animalId: '',
    vaccineName: '',
    scheduledDate: '',
    veterinarian: '',
    vetId:'',
    batchNumber: '',
    notes: '',
    status: ""
    });
  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.error || "Failed to schedule vaccination");
  }
};


  const handleViewRecord = (animal: Animal) => {
    setSelectedAnimal(animal);
    setViewRecordDialogOpen(true);
  };

  const handleGenerateReport = (animal: Animal) => {
    // Simulate report generation
    toast.success(`Medical report for ${animal.name} generated successfully!`, {
      description: 'Report has been downloaded to your device.',
    });
  };

  useEffect(() => {
  const fetchAll = async () => {
    try {
      const [animalsRes, appointmentsRes, vaccinationsRes] = await Promise.all([
        axios.get("http://localhost:5000/animals"),
        axios.get("http://localhost:5000/appointments"),
        axios.get("http://localhost:5000/vaccinations"),
      ]);
      console.log(appointmentsRes.data.appointments,vaccinationsRes.data.vaccinations)
      // Map appointments: extract animal name and id
      const mappedAppointments = appointmentsRes.data.appointments.map((app: any) => ({
        ...app,
        animalName: app.animalId.name,
        animalId: app.animalId._id,
      }));

      // Map vaccinations: extract animal name and id
      const mappedVaccinations = vaccinationsRes.data.vaccinations.map((v: any) => ({
        ...v,
        animalName: v.animalId.name,
        animalId: v.animalId._id,
      }));

      setMockAnimals(animalsRes.data.animals);
      setMockAppointments(mappedAppointments);
      setMockVaccinations(mappedVaccinations);
      setUpcomingAppointments(mappedAppointments.filter((a:any) => a.status === 'Scheduled'))
      setCompletedAppointments(mappedAppointments.filter((a:any) => a.status === 'Completed'))
      setCompletedVaccinations(mappedVaccinations.filter((v:any)=>v.status === 'Completed'))
      setUpcomingVaccinations(mappedVaccinations.filter((v:any) => v.status === 'Due Soon' || v.status === 'Overdue'))
    } catch (err) {
      console.error("Failed to load doctor portal data:", err);
    }
  };

  fetchAll();
}, []);

    // console.log(mockAnimals,mockAppointments,mockVaccinations)
 
//   const isThisWeek = (dateStr: string) => {
//   if (!dateStr) return false;

//   const date = new Date(dateStr);
//   const today = new Date();

//   const firstDay = new Date(today);
//   firstDay.setDate(today.getDate() - today.getDay()); // Sunday start

//   const lastDay = new Date(today);
//   lastDay.setDate(today.getDate() + (6 - today.getDay())); // Saturday end

//   return date >= firstDay && date <= lastDay;
// };

    useEffect(() => {

    const count = completedAppointments.length

    setCompletedThisWeek(count);
  }, [completedAppointments]);

  useEffect(() => {
  axios.get<User[]>("http://localhost:5000/auth/vets")
    .then(res => setVets(res.data))
    .catch(err => console.error(err));
}, []);

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
      value: completedThisWeek,
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
  const handleCompleteAppointment = async (apt: Appointment) => {
 
  try {
    const res = await axios.put(`http://localhost:5000/appointments/${apt._id}/complete`);

    // Update UI: replace the updated appointment in state
    setUpcomingAppointments(prev =>
      prev.filter((a)=>{return a._id !=apt._id})
    );
    setCompletedThisWeek(completedThisWeek + 1)
  } catch (err) {
    console.error("Failed to complete appointment:", err);
  }
};
const handleCompleteVaccination = async (vac: Vaccination) => {
  try {
    const res = await axios.put(`http://localhost:5000/vaccinations/${vac._id}/complete`);
    const updated = res.data.vaccination;
    // Update UI
    setUpcomingVaccinations(prev =>
      prev.filter((v)=>{return v._id !=vac._id})
    );
    setCompletedVaccinations(prev => [...prev, updated]);

  } catch (err) {
    console.error("Failed to complete vaccination:", err);
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
            <Button onClick={() => setScheduleDialogOpen(true)} className="bg-[#1ABC9C] hover:bg-[#16a085]">
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
                    <TableRow key={apt._id}>
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
                          <Button size="sm" variant="outline"  onClick={() => handleViewAnimal(apt._id)}>View</Button>
                          <Button onClick={()=>{handleCompleteAppointment(apt)}} size="sm" className="bg-[#27AE60] hover:bg-[#229954]">Complete</Button>
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
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#2C3E50]">Vaccination Management</h3>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]" onClick={() => setScheduleVaccinationDialogOpen(true)}>
              <Syringe className="h-4 w-4 mr-2" />
              Schedule Vaccination
            </Button>
          </div>
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
                  const animal = mockAnimals.find(a => a._id === vac.animalId);
                  return (
                    <div key={vac._id} className="p-3 border border-[#BDC3C7] rounded-lg space-y-2">
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
                      <Button onClick={()=>{handleCompleteVaccination(vac)}} size="sm" className="w-full bg-[#1ABC9C] hover:bg-[#16a085]">
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
                  {completedVaccinations.map((vac) => {
                    const animal = mockAnimals.find(a => a._id === vac.animalId);
                    return (
                      <TableRow key={vac._id}>
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
              <Card key={animal._id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
                  <Button variant="outline" size="sm" className="w-full mt-3" onClick={()=>{handleViewRecord(animal)}}>
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
        {upcomingAppointments.filter(
          (apt) => apt.date === date?.toLocaleDateString("en-CA")
        ).length > 0 ? (
          upcomingAppointments
            .filter((apt) => apt.date === date?.toLocaleDateString("en-CA"))
            .map((apt) => (
              <div
                key={apt._id}
                className="p-3 border border-[#BDC3C7] rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="bg-[#1ABC9C]/10 p-2 rounded">
                      <Clock className="h-5 w-5 text-[#1ABC9C]" />
                    </div>
                    <div>
                      <h4 className="text-[#2C3E50]">
                        {apt.time} - {apt.animalName}
                      </h4>
                      <p className="text-sm text-[#7F8C8D]">
                        {apt.type} with {apt.veterinarian}
                      </p>
                      <p className="text-sm text-[#7F8C8D] mt-1">{apt.notes}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-[#3498DB]/10 text-[#3498DB]"
                  >
                    {apt.status}
                  </Badge>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-[#7F8C8D] py-8">
            No appointments scheduled for this date
          </p>
        )}
      </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      {/* Schedule Appointment Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[200px]">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Schedule a new appointment for an animal. Fill in all required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="animal">Animal</Label>
              <Select value={newAppt.animalId} onValueChange={(value: any) => setNewAppt({...newAppt, animalId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an animal" />
                </SelectTrigger>
                <SelectContent>
                  {mockAnimals.map((animal) => (
                    <SelectItem key={animal._id} value={animal._id}>
                      {animal.name} - {animal.breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={newAppt.type} onValueChange={(value: any) => setNewAppt({...newAppt, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vaccination">Vaccination</SelectItem>
                  <SelectItem value="Checkup">Checkup</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({...newAppt, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({...newAppt, time: e.target.value})}
                />
              </div>
            </div>
           <div className="space-y-2">
  <Label htmlFor="veterinarian">Veterinarian</Label>

  <Select
    value={
      newAppt.vetId
        ? JSON.stringify({ id: newAppt.vetId, name: newAppt.veterinarian })
        : ""
    }
    onValueChange={(value: string) => {
      const vet = JSON.parse(value);
      setNewAppt({
        ...newAppt,
        veterinarian: vet.name,
        vetId: vet.id,
      });
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select veterinarian" />
    </SelectTrigger>

    <SelectContent>
      {vets.map((vet) => (
        <SelectItem
          key={vet._id}
          value={JSON.stringify({ id: vet._id, name: vet.fullName })}
        >
          {vet.fullName}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
          <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Additional notes..."
                value={newAppt.notes}
                onChange={(e) => setNewAppt({...newAppt, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]" onClick={handleScheduleAppointment}>
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Animal Details Dialog */}
      <Dialog open={viewAnimalDialogOpen} onOpenChange={setViewAnimalDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Animal Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedAnimal?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedAnimal && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedAnimal.imageUrl} 
                  alt={selectedAnimal.name}
                  className="w-80 h-80 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-[#2C3E50]">{selectedAnimal.name}</h3>
                    <p className="text-[#7F8C8D]">{selectedAnimal.breed}</p>
                  </div>
                  <Badge className={
                    selectedAnimal.status === 'Available' ? 'bg-[#27AE60] text-white' :
                    selectedAnimal.status === 'Pending' ? 'bg-[#F39C12] text-white' :
                    selectedAnimal.status === 'Medical Hold' ? 'bg-[#E74C3C] text-white' :
                    'bg-[#3498DB] text-white'
                  }>
                    {selectedAnimal.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Species</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.species}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Age</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.age}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Gender</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Weight</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.weight}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#7F8C8D]">Location</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.location}</p>
                </div>
              </div>

              {selectedAppointment && (
                <div className="pt-4 border-t">
                  <h4 className="text-[#2C3E50] mb-2">Appointment Details</h4>
                  <div className="bg-[#ECF0F1] p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#7F8C8D]">Type:</span>
                      <span className="text-[#2C3E50]">{selectedAppointment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7F8C8D]">Date & Time:</span>
                      <span className="text-[#2C3E50]">
                        {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7F8C8D]">Veterinarian:</span>
                      <span className="text-[#2C3E50]">{selectedAppointment.veterinarian}</span>
                    </div>
                    <div>
                      <span className="text-[#7F8C8D]">Notes:</span>
                      <p className="text-[#2C3E50] mt-1">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <h4 className="text-[#2C3E50] mb-2">Temperament</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAnimal.temperament.map((trait, index) => (
                    <Badge key={index} variant="outline" className="bg-[#1ABC9C]/10 text-[#1ABC9C]">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewAnimalDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Medical Record Dialog */}
      <Dialog open={viewRecordDialogOpen} onOpenChange={setViewRecordDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Medical Record</DialogTitle>
            <DialogDescription>
              Complete medical record for {selectedAnimal?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedAnimal && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <img 
                  src={selectedAnimal.imageUrl} 
                  alt={selectedAnimal.name}
                  className="w-80 h-80 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-[#2C3E50]">{selectedAnimal.name}</h3>
                  <p className="text-[#7F8C8D]">{selectedAnimal.breed}</p>
                  <p className="text-sm text-[#7F8C8D] mt-1">ID: {selectedAnimal._id}</p>
                  <p className="text-sm text-[#7F8C8D]">Admitted: {new Date(selectedAnimal.admissionDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Medical History
                </h4>
                <div className="space-y-2">
                  {selectedAnimal.medicalHistory.map((record, index) => (
                    <div key={index} className="p-3 bg-[#ECF0F1] rounded-lg">
                      <p className="text-[#2C3E50]">{record}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[#2C3E50] mb-2 flex items-center gap-2">
                  <Syringe className="h-4 w-4" />
                  Vaccination History
                </h4>
                {selectedAnimal.vaccinations.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vaccine</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Next Due</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedAnimal.vaccinations.map((vac) => (
                          <TableRow key={vac._id}>
                            <TableCell>{vac.vaccineName}</TableCell>
                            <TableCell>{new Date(vac.dateAdministered).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(vac.nextDueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={
                                vac.status === 'Completed' ? 'bg-[#27AE60] text-white' :
                                vac.status === 'Due Soon' ? 'bg-[#F39C12] text-white' :
                                'bg-[#E74C3C] text-white'
                              }>
                                {vac.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-[#7F8C8D] text-sm">No vaccination records available.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Species</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.species}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Age</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.age}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Gender</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Weight</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.weight}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                if (selectedAnimal) handleGenerateReport(selectedAnimal);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]" onClick={() => setViewRecordDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
       {/* Schedule Vaccination Dialog */}
      <Dialog open={scheduleVaccinationDialogOpen} onOpenChange={setScheduleVaccinationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Schedule Vaccination</DialogTitle>
            <DialogDescription>
              Schedule a vaccination for an animal. Fill in all required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="vac-animal">Animal</Label>
              <Select value={newVaccination.animalId} onValueChange={(value:any) => setNewVaccination({...newVaccination, animalId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an animal" />
                </SelectTrigger>
                <SelectContent>
                  {mockAnimals.map((animal) => (
                    <SelectItem key={animal._id} value={animal._id}>
                      {animal.name} - {animal.breed} ({animal.species})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vaccine-type">Vaccine Type</Label>
              <Select value={newVaccination.vaccineName} onValueChange={(value:any) => setNewVaccination({...newVaccination, vaccineName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DHPP">DHPP (Dogs)</SelectItem>
                  <SelectItem value="Rabies">Rabies</SelectItem>
                  <SelectItem value="FVRCP">FVRCP (Cats)</SelectItem>
                  <SelectItem value="Bordetella">Bordetella</SelectItem>
                  <SelectItem value="RHD">RHD (Rabbits)</SelectItem>
                  <SelectItem value="Leptospirosis">Leptospirosis</SelectItem>
                  <SelectItem value="FeLV">FeLV (Cats)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-date">Scheduled Date</Label>
              <Input 
                id="vac-date" 
                type="date" 
                value={newVaccination.scheduledDate}
                onChange={(e) => setNewVaccination({...newVaccination, scheduledDate: e.target.value})}
              />
            </div>
         <div className="space-y-2">
  <Label htmlFor="vac-veterinarian">Veterinarian</Label>

  <Select
    value={
      newVaccination.vetId
        ? JSON.stringify({
            id: newVaccination.vetId,
            name: newVaccination.veterinarian,
          })
        : ""
    }
    onValueChange={(value: string) => {
      const vet = JSON.parse(value);
      setNewVaccination({
        ...newVaccination,
        veterinarian: vet.name,
        vetId: vet.id,
      });
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select veterinarian" />
    </SelectTrigger>

    <SelectContent>
      {vets.map((vet) => (
        <SelectItem
          key={vet._id}
          value={JSON.stringify({
            id: vet._id,
            name: vet.fullName,
          })}
        >
          {vet.fullName}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

            <div className="space-y-2">
              <Label htmlFor="batch-number">Batch Number (Optional)</Label>
              <Input 
                id="batch-number" 
                placeholder="e.g., DHPP-2025-11"
                value={newVaccination.batchNumber}
                onChange={(e) => setNewVaccination({...newVaccination, batchNumber: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-notes">Notes</Label>
              <Textarea 
                id="vac-notes" 
                placeholder="Additional notes or instructions..."
                value={newVaccination.notes}
                onChange={(e) => setNewVaccination({...newVaccination, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleVaccinationDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1ABC9C] hover:bg-[#16a085]" onClick={handleScheduleVaccination}>
              <Syringe className="h-4 w-4 mr-2" />
              Schedule Vaccination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
