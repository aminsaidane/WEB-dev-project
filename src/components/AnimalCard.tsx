import { Animal } from './mock-data';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Calendar, MapPin, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AnimalCardProps {
  animal: Animal;
  favorite?:boolean
  onViewDetails?: (animal: Animal) => void;
  onAdopt?: (animal: Animal) => void;
  addFavorite?:(animalId:string)=>void;
  removeFavorite?:(animalId:string)=>void;
  showActions?: boolean;
}

export default function AnimalCard({ animal, favorite,onViewDetails, onAdopt,addFavorite,removeFavorite, showActions = true }: AnimalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-[#27AE60] text-white';
      case 'Pending':
        return 'bg-[#F39C12] text-white';
      case 'Adopted':
        return 'bg-[#3498DB] text-white';
      case 'Medical Hold':
        return 'bg-[#E74C3C] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={animal.imageUrl}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(animal.status)}>
            {animal.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-[#2C3E50]">{animal.name}</h3>
            <p className="text-[#7F8C8D]">{animal.breed}</p>
          </div>
          <Button onClick={favorite ? ()=>{removeFavorite?.(animal._id)}: ()=>{addFavorite?.(animal._id)} } variant="ghost" size="icon" className="text-[#E67E22]">
            <Heart className={`h-4 w-4 mr-2 ${favorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {/* onClick={favorites.includes(selectedAnimal._id) ? ()=>{removeFavorite(selectedAnimal._id)}: ()=>{addFavorite(selectedAnimal._id)} }
                >
                  <Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedAnimal._id) ? 'fill-current' : ''}`} /> */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-[#7F8C8D]">
            <span className="text-sm">{animal.species} • {animal.gender} • {animal.age}</span>
          </div>
          <div className="flex items-center gap-1 text-[#7F8C8D]">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{animal.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {animal.temperament.slice(0, 3).map((trait, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-[#7F8C8D] line-clamp-2">
          {animal.description}
        </p>
      </CardContent>

      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(animal)}
          >
            <Info className="h-4 w-4 mr-2" />
            Details
          </Button>
          {animal.status === 'Available' && (
            <Button 
              className="flex-1 bg-[#1ABC9C] hover:bg-[#16a085]"
              onClick={() => onAdopt?.(animal)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Adopt
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
