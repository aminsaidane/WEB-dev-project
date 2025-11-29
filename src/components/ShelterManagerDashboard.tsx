import {  analyticsData, Animal, AdoptionApplication } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { PawPrint, Users, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import AnimalCard from './AnimalCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useState,useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import  axios  from 'axios';

export default function ShelterManagerDashboard() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<AdoptionApplication | null>(null);
  const [showAddAnimalDialog, setShowAddAnimalDialog] = useState(false);
  const [mockAnimals, setMockAnimals] = useState<Animal[]>([]);
  const [mockApplications, setMockApplications] = useState<AdoptionApplication[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog' as 'Dog' | 'Cat' | 'Rabbit' | 'Other',
    breed: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female',
    weight: '',
    imageUrl:'',
    status:'Available' as 'Available' |'Pending' |'Medical Hold',
    location: '',
    description: '',
    temperament: '',
    medicalHistory:'',
    vaccinations:''
  });
   const [updateData, setUpdateData] = useState({
    _id:'',
    name: '',
    species: 'Dog' as 'Dog' | 'Cat' | 'Rabbit' | 'Other',
    breed: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female',
    weight: '',
    imageUrl:'',
    status:'Available' as 'Available' |'Pending' |'Medical Hold',
    location: '',
    description: '',
    temperament: '',
    medicalHistory:'',
    vaccinations:''
  });
 useEffect(() => {
  const fetchData = async () => {
    try {
      const [animalsRes, appsRes] = await Promise.all([
        axios.get("http://localhost:5000/animals"),
        axios.get("http://localhost:5000/applications"),
      ]);

      // Map applications: extract animal name and id from populated animalId
      const mappedApplications = appsRes.data.applications.map((app: any) => ({
        ...app,
        animalName: app.animalId.name,
        animalId: app.animalId._id,
      }));

      setMockAnimals(animalsRes.data.animals);
      setMockApplications(mappedApplications);
    } catch (error) {
      console.error("Error loading shelter panel data:", error);
    }
  };

  fetchData();
}, []);
  console.log(mockAnimals)
  console.log(mockApplications)
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
  const handleAddAnimal = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Convert comma-separated strings into arrays
    const payload = {
      ...formData,
      temperament: formData.temperament.split(",").map(t => t.trim()),
      vaccinations: formData.vaccinations.split(",").map(v => v.trim()),
      medicalHistory: formData.medicalHistory.split(",").map(m => m.trim()),
    };

    const res = await axios.post("http://localhost:5000/animals", payload, {
      withCredentials: true, // send cookies if you use session auth
    });

    console.log("Animal added:", res.data.animal);

    setMockAnimals((prev)=>{return [...prev,res.data.animal]})

    // Reset form and close dialog
    setFormData({
      name: "",
      species: "Dog",
      breed: "",
      age: "",
      gender: "Male",
      weight: "",
      status: "Available",
      imageUrl: "",
      location: "",
      description: "",
      temperament: "",
      vaccinations: "",
      medicalHistory: "",
    });
    setShowAddAnimalDialog(false);
  } catch (err) {
    console.error("Failed to add animal:", err);
  }
};
const handleDeleteAnimal = async(animal:Animal,e:React.FormEvent) =>{
  e.preventDefault();
  try{
    const res = await axios.delete(`http://localhost:5000/animals/${animal?._id}`, {
       withCredentials: true, // send cookies if you use session auth
     });
       setMockAnimals((prev)=>{return prev.filter((a)=>{
        return a._id != animal._id
    })})
  }catch(err){
    console.log("failed to delete animal",err)
  }
}
const handleUpdateAnimal = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Convert comma-separated strings into arrays
    console.log(updateData)
    const {_id,...data} = updateData
    const payload = {
      ...data,
      temperament: updateData.temperament.split(",").map(t => t.trim()),
      vaccinations: updateData.vaccinations.split(",").map(v => v.trim()),
      medicalHistory: updateData.medicalHistory.split(",").map(m => m.trim()),
    };
    console.log(payload)
     const res = await axios.put(`http://localhost:5000/animals/${selectedAnimal?._id}`, payload, {
       withCredentials: true, // send cookies if you use session auth
     });

    console.log("Animal updated:", res.data.animal);

    setMockAnimals((prev)=>{return prev.map((animal)=>{
      if(animal._id== res.data.animal._id){
        return res.data.animal
      }else{
        return animal
      }
    })})

    // Reset form and close dialog
    setUpdateData({
      _id:"",
      name: "",
      species: "Dog",
      breed: "",
      age: "",
      gender: "Male",
      weight: "",
      status: "Available",
      imageUrl: "",
      location: "",
      description: "",
      temperament: "",
      vaccinations: "",
      medicalHistory: "",
    });
    setSelectedAnimal(null)
  } catch (err) {
    console.error("Failed to update animal:", err);
  }
};
const handleUpdateApplicationStatus = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!selectedApplication) return;

  try {
    // Send only the updated status
    const res = await axios.put(`http://localhost:5000/applications/${selectedApplication!._id}`, {
      status: selectedApplication!.status,
    });

 

   setMockApplications((prev)=>{return prev.map((app)=>{
      if(app._id== res.data.application._id){
        return res.data.application
      }else{
        return app
      }
    })})

    // Close dialog
   setSelectedApplication(null)
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status");
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
            <Button  onClick={() => setShowAddAnimalDialog(true)} className="bg-[#1ABC9C] hover:bg-[#16a085]">
              <PawPrint className="h-4 w-4 mr-2" />
              Add New Animal
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnimals.map(animal => (
              <AnimalCard 
                key={animal._id} 
                animal={animal}
                onViewDetails={setSelectedAnimal}
                onUpdate={setSelectedAnimal}
                onDelete={handleDeleteAnimal}
                setUpdateData={setUpdateData}
                showActions={false}
                showAdminActions={true}
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
                    <TableRow key={app._id}>
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
                          <Button onClick={()=>{setSelectedApplication(app)}} size="sm" variant="outline">Review</Button>
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
      {/* <Dialog open={!!selectedAnimal} onOpenChange={() => setSelectedAnimal(null)}>
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
                <p className="text-sm text-[#7F8C8D] mb-2">Vaccinationsvaccinationss</p>
                <div className="space-y-2">
                  {selectedAnimal.vaccinationss.length > 0 ? (
                    selectedAnimal.vaccinationss.map((vac) => (
                      <div key={vac._id} className="flex justify-between items-center p-2 bg-[#ECF0F1] rounded">
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
                    <p className="text-[#7F8C8D]">No vaccinations records</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
       {/* Add Animal Dialog */}
      <Dialog open={showAddAnimalDialog} onOpenChange={setShowAddAnimalDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Add New Animal</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddAnimal}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Max"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="species">Species *</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value:any) => setFormData({ ...formData, species: value as 'Dog' | 'Cat' | 'Rabbit' | 'Other' })}
                >
                  <SelectTrigger>
                    <SelectValue>{formData.species}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="breed">Breed *</Label>
                <Input
                  id="breed"
                  placeholder="e.g., Golden Retriever"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  placeholder="e.g., 3 years"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value:any) => setFormData({ ...formData, gender: value as 'Male' | 'Female' })}
                >
                  <SelectTrigger>
                    <SelectValue>{formData.gender}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight">Weight *</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 30 kg"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value:any) => setFormData({ ...formData, status: value as 'Available' | 'Pending' |'Medical Hold' })}
                >
                  <SelectTrigger>
                    <SelectValue>{formData.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Medical Hold">Medical Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ImgUrl">Image Url *</Label>
                <Input
                  id="ImgUrl"
                  placeholder="e.g., URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown Shelter - Wing A"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the animal's personality and behavior"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="temperament">Temperament (comma separated)</Label>
                <Input
                  id="temperament"
                  placeholder="e.g., Friendly, Energetic, Good with kids"
                  value={formData.temperament}
                  onChange={(e) => setFormData({ ...formData, temperament: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="vacination">Vacination (comma separated)</Label>
                <Input
                  id="vacination"
                  placeholder="e.g., DHPP, Rabies"
                  value={formData.vaccinations}
                  onChange={(e) => setFormData({ ...formData, vaccinations: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="medicalHistory">Medical History (comma separated)</Label>
                <Input
                  id="medicalHistory"
                  placeholder="e.g., FIV/FeLV negative, Microchipped"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddAnimalDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#1ABC9C] hover:bg-[#16a085]"
               
              >
                Add Animal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/*update animal dialogue  */}
      <Dialog open={!!selectedAnimal} onOpenChange={()=>{setSelectedAnimal(null)}}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Add New Animal</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleUpdateAnimal}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder={updateData?.name}
                  value={updateData?.name}
                  onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="species">Species *</Label>
                <Select
                  value={updateData.species}
                  onValueChange={(value:any) => setUpdateData({ ...updateData, species: value as 'Dog' | 'Cat' | 'Rabbit' | 'Other' })}
                >
                  <SelectTrigger>
                    <SelectValue>{updateData.species}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="breed">Breed *</Label>
                <Input
                  id="breed"
                  placeholder="e.g., Golden Retriever"
                  value={updateData.breed}
                  onChange={(e) => setUpdateData({ ...updateData, breed: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  placeholder="e.g., 3 years"
                  value={updateData.age}
                  onChange={(e) => setUpdateData({ ...updateData, age: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={updateData.gender}
                  onValueChange={(value:any) => setUpdateData({ ...updateData, gender: value as 'Male' | 'Female' })}
                >
                  <SelectTrigger>
                    <SelectValue>{updateData.gender}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight">Weight *</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 30 kg"
                  value={updateData.weight}
                  onChange={(e) => setFormData({ ...updateData, weight: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Status</Label>
                <Select
                  value={updateData.status}
                  onValueChange={(value:any) => setUpdateData({ ...updateData, status: value as 'Available' | 'Pending' |'Medical Hold' })}
                >
                  <SelectTrigger>
                    <SelectValue>{updateData.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Medical Hold">Medical Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ImgUrl">Image Url *</Label>
                <Input
                  id="ImgUrl"
                  placeholder="e.g., URL"
                  value={updateData.imageUrl}
                  onChange={(e) => setUpdateData({ ...updateData, imageUrl: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown Shelter - Wing A"
                  value={updateData.location}
                  onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the animal's personality and behavior"
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="temperament">Temperament (comma separated)</Label>
                <Input
                  id="temperament"
                  placeholder="e.g., Friendly, Energetic, Good with kids"
                  value={updateData.temperament}
                  onChange={(e) => setUpdateData({ ...updateData, temperament: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="vacination">Vacination (comma separated)</Label>
                <Input
                  id="vacination"
                  placeholder="e.g., DHPP, Rabies"
                  value={updateData.vaccinations}
                  onChange={(e) => setUpdateData({ ...updateData, vaccinations: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="medicalHistory">Medical History (comma separated)</Label>
                <Input
                  id="medicalHistory"
                  placeholder="e.g., FIV/FeLV negative, Microchipped"
                  value={updateData.medicalHistory}
                  onChange={(e) => setUpdateData({ ...updateData, medicalHistory: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedAnimal(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#1ABC9C] hover:bg-[#16a085]"
                
              >
                Update Animal 
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
       {/* Review Dialog */}
       <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-[#2C3E50]">
        Adoption Application — {selectedApplication?.applicantName}
      </DialogTitle>
    </DialogHeader>

    {selectedApplication && (
      <div className="space-y-4">

        {/* Applicant Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#7F8C8D]">Name</p>
            <p className="text-[#2C3E50]">{selectedApplication.applicantName}</p>
          </div>

          <div>
            <p className="text-sm text-[#7F8C8D]">Email</p>
            <p className="text-[#2C3E50]">{selectedApplication.applicantEmail}</p>
          </div>

          <div>
            <p className="text-sm text-[#7F8C8D]">Phone</p>
            <p className="text-[#2C3E50]">{selectedApplication.applicantPhone}</p>
          </div>

          <div>
            <p className="text-sm text-[#7F8C8D]">Status</p>
            <p className="text-[#2C3E50]">{selectedApplication.status}</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <p className="text-sm text-[#7F8C8D]">Address</p>
          <p className="text-[#2C3E50]">{selectedApplication.address}</p>
        </div>

        {/* Home & Pets */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#7F8C8D]">Home Type</p>
            <p className="text-[#2C3E50]">{selectedApplication.homeType}</p>
          </div>

          <div>
            <p className="text-sm text-[#7F8C8D]">Has Other Pets?</p>
            <p className="text-[#2C3E50]">
              {selectedApplication.hasOtherPets ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-sm text-[#7F8C8D] mb-1">Experience</p>
          <p className="text-[#2C3E50] whitespace-pre-line">
            {selectedApplication.experience}
          </p>
        </div>

        {/* Submitted Date */}
        <div>
          <p className="text-sm text-[#7F8C8D]">Submitted On</p>
          <p className="text-[#2C3E50]">
            {new Date(selectedApplication.submittedDate).toLocaleDateString()}
          </p>
        </div>

        {/* Linked Animal */}
        {selectedApplication.animalId && (
          <div className="p-3 bg-[#ECF0F1] rounded-lg">
            <p className="text-sm text-[#7F8C8D]">Animal</p>
            <p className="text-[#2C3E50] font-medium">
              {selectedApplication.animalName}
            </p>
          </div>
        )}
      </div>
    )}
    
      <div>
      <Label htmlFor="status">Status</Label>
                <Select
                  value={selectedApplication?.status}
                  onValueChange={(value:any) => setSelectedApplication((prev) => ({
        ...prev!,
        status: value as
          | "Pending Review"
          | "Approved"
          | "Rejected"
          | "Interview Scheduled",
      }))}
                >
                  <SelectTrigger>
                    <SelectValue>{selectedApplication?.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  </SelectContent>
                </Select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
          <Button
                variant="outline"
                onClick={() => setSelectedApplication(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#1ABC9C] hover:bg-[#16a085]"
                 onClick={handleUpdateApplicationStatus}
              >
                Update Animal 
              </Button>
      </div>
    
  </DialogContent>
      </Dialog> 
    </div>
  );
}
