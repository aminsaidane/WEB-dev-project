import { mockAnimals, Animal } from './mock-data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Filter, Heart, MapPin } from 'lucide-react';
import AnimalCard from './AnimalCard';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

export default function AdopterPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const availableAnimals = mockAnimals.filter(animal => animal.status === 'Available');

  const filteredAnimals = availableAnimals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || animal.species === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  const favoriteAnimals = mockAnimals.filter(animal => favorites.includes(animal.id));

  const handleAdopt = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedAnimal?.name}! Our team will review it shortly.`);
    setShowApplicationForm(false);
    setSelectedAnimal(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-[#1ABC9C] to-[#16a085] text-white">
        <CardContent className="p-8">
          <h2 className="mb-2">Find Your Perfect Companion</h2>
          <p className="mb-4">Browse our available animals and start your adoption journey today</p>
          <div className="flex gap-2 text-sm">
            <Badge className="bg-white/20 border-white/30">
              {availableAnimals.length} Animals Available
            </Badge>
            <Badge className="bg-white/20 border-white/30">
              <Heart className="h-3 w-3 mr-1" />
              {favorites.length} Favorites
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] h-4 w-4" />
              <Input
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="Dog">Dogs</SelectItem>
                  <SelectItem value="Cat">Cats</SelectItem>
                  <SelectItem value="Rabbit">Rabbits</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#ECF0F1]">
          <TabsTrigger value="browse">Browse Animals</TabsTrigger>
          <TabsTrigger value="favorites">
            My Favorites ({favorites.length})
          </TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[#7F8C8D]">
              Showing {filteredAnimals.length} of {availableAnimals.length} available animals
            </p>
          </div>

          {filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAnimals.map(animal => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onViewDetails={setSelectedAnimal}
                  onAdopt={handleAdopt}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-[#7F8C8D] mb-4">No animals match your search criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSpeciesFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          {favoriteAnimals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteAnimals.map(animal => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onViewDetails={setSelectedAnimal}
                  onAdopt={handleAdopt}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 text-[#7F8C8D] mx-auto mb-4" />
                <h3 className="text-[#2C3E50] mb-2">No favorites yet</h3>
                <p className="text-[#7F8C8D] mb-4">
                  Start browsing and click the heart icon to save your favorite animals
                </p>
                <Button className="bg-[#1ABC9C] hover:bg-[#16a085]">
                  Browse Animals
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-[#ECF0F1] p-4 rounded-lg inline-block mb-4">
                <svg className="h-12 w-12 text-[#7F8C8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-[#2C3E50] mb-2">No Applications Yet</h3>
              <p className="text-[#7F8C8D] mb-4">
                When you apply to adopt an animal, you'll be able to track your application status here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Animal Details Dialog */}
      <Dialog open={!!selectedAnimal && !showApplicationForm} onOpenChange={() => setSelectedAnimal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">{selectedAnimal?.name}</DialogTitle>
            <DialogDescription>
              {selectedAnimal?.breed} • {selectedAnimal?.age} • {selectedAnimal?.gender}
            </DialogDescription>
          </DialogHeader>
          {selectedAnimal && (
            <div className="space-y-4">
              <img
                src={selectedAnimal.imageUrl}
                alt={selectedAnimal.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Species</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.species}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">Weight</p>
                  <p className="text-[#2C3E50]">{selectedAnimal.weight}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#7F8C8D]">Location</p>
                  <div className="flex items-center gap-1 text-[#2C3E50]">
                    <MapPin className="h-4 w-4" />
                    {selectedAnimal.location}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">About {selectedAnimal.name}</p>
                <p className="text-[#2C3E50]">{selectedAnimal.description}</p>
              </div>

              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">Temperament</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAnimal.temperament.map((trait, index) => (
                    <Badge key={index} variant="outline" className="bg-[#1ABC9C]/10 text-[#1ABC9C] border-[#1ABC9C]/30">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">Medical Information</p>
                <ul className="list-disc list-inside text-[#2C3E50] space-y-1">
                  {selectedAnimal.medicalHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-[#7F8C8D] mb-2">Vaccination Status</p>
                <div className="space-y-2">
                  {selectedAnimal.vaccinations.length > 0 ? (
                    selectedAnimal.vaccinations.map((vac) => (
                      <div key={vac.id} className="flex justify-between items-center p-2 bg-[#ECF0F1] rounded">
                        <div>
                          <p className="text-[#2C3E50]">{vac.vaccineName}</p>
                          <p className="text-xs text-[#7F8C8D]">
                            Last: {new Date(vac.dateAdministered).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-[#27AE60] text-white">
                          Up to Date
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#7F8C8D]">Vaccination records available upon request</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setFavorites(prev => 
                    prev.includes(selectedAnimal.id) 
                      ? prev.filter(id => id !== selectedAnimal.id)
                      : [...prev, selectedAnimal.id]
                  )}
                >
                  <Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedAnimal.id) ? 'fill-current' : ''}`} />
                  {favorites.includes(selectedAnimal.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                {selectedAnimal.status === 'Available' && (
                  <Button 
                    className="flex-1 bg-[#1ABC9C] hover:bg-[#16a085]"
                    onClick={() => handleAdopt(selectedAnimal)}
                  >
                    Apply to Adopt
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Adoption Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50]">Adoption Application for {selectedAnimal?.name}</DialogTitle>
            <DialogDescription>
              Please fill out this form to begin the adoption process
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" required className="bg-white" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required className="bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required className="bg-white" />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input id="age" type="number" required className="bg-white" />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Full Address *</Label>
              <Input id="address" required className="bg-white" />
            </div>

            <div>
              <Label htmlFor="homeType">Type of Home *</Label>
              <Select required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select home type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Pet Ownership Experience *</Label>
              <Textarea 
                id="experience" 
                required 
                placeholder="Please describe your experience with pets..."
                className="bg-white"
              />
            </div>

            <div>
              <Label htmlFor="reason">Why do you want to adopt {selectedAnimal?.name}? *</Label>
              <Textarea 
                id="reason" 
                required 
                placeholder="Tell us why you'd be a great fit..."
                className="bg-white"
              />
            </div>

            <div>
              <Label htmlFor="otherPets">Do you have other pets?</Label>
              <Textarea 
                id="otherPets" 
                placeholder="If yes, please describe them..."
                className="bg-white"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowApplicationForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#1ABC9C] hover:bg-[#16a085]">
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
