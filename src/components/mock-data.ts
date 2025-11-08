// Mock data for PawsCare system

export interface Animal {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Rabbit' | 'Other';
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  weight: string;
  imageUrl: string;
  status: 'Available' | 'Pending' | 'Adopted' | 'Medical Hold';
  location: string;
  description: string;
  admissionDate: string;
  medicalHistory: string[];
  vaccinations: Vaccination[];
  temperament: string[];
}

export interface Vaccination {
  id: string;
  animalId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  veterinarian: string;
  batchNumber: string;
  status: 'Completed' | 'Due Soon' | 'Overdue';
}

export interface AdoptionApplication {
  id: string;
  animalId: string;
  animalName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  address: string;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Interview Scheduled';
  submittedDate: string;
  experience: string;
  homeType: string;
  hasOtherPets: boolean;
}

export interface Appointment {
  id: string;
  animalId: string;
  animalName: string;
  type: 'Vaccination' | 'Checkup' | 'Surgery' | 'Consultation';
  date: string;
  time: string;
  veterinarian: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes: string;
}

export const mockAnimals: Animal[] = [
  {
    id: 'A001',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 years',
    gender: 'Male',
    weight: '30 kg',
    imageUrl: 'https://images.unsplash.com/photo-1689185083033-fd8512790d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzYxOTQ2NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Downtown Shelter - Wing A',
    description: 'Friendly and energetic Golden Retriever. Great with kids and other pets. Loves to play fetch and go for long walks.',
    admissionDate: '2025-09-15',
    medicalHistory: ['Neutered', 'Heartworm negative', 'Dental cleaning completed'],
    vaccinations: [],
    temperament: ['Friendly', 'Energetic', 'Good with kids', 'Trained']
  },
  {
    id: 'A002',
    name: 'Luna',
    species: 'Cat',
    breed: 'Tabby Mix',
    age: '2 years',
    gender: 'Female',
    weight: '4 kg',
    imageUrl: 'https://images.unsplash.com/photo-1625192494235-21e8821040c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTk2NTU0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Downtown Shelter - Wing B',
    description: 'Sweet and affectionate tabby cat. Enjoys cuddles and quiet environments. Perfect lap cat for a calm household.',
    admissionDate: '2025-10-01',
    medicalHistory: ['Spayed', 'FIV/FeLV negative', 'Microchipped'],
    vaccinations: [],
    temperament: ['Calm', 'Affectionate', 'Indoor cat', 'Quiet']
  },
  {
    id: 'A003',
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle',
    age: '5 years',
    gender: 'Female',
    weight: '12 kg',
    imageUrl: 'https://images.unsplash.com/photo-1710927865281-9cf4d7ee2782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweXxlbnwxfHx8fDE3NjE5MTEwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Pending',
    location: 'Downtown Shelter - Wing A',
    description: 'Curious and vocal Beagle with a great nose. Needs a home with a fenced yard. Good with other dogs.',
    admissionDate: '2025-08-20',
    medicalHistory: ['Spayed', 'Current on all vaccinations', 'Hip dysplasia negative'],
    vaccinations: [],
    temperament: ['Curious', 'Vocal', 'Good with dogs', 'Needs exercise']
  },
  {
    id: 'A004',
    name: 'Oliver',
    species: 'Cat',
    breed: 'Persian',
    age: '4 years',
    gender: 'Male',
    weight: '5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1585137173132-cf49e10ad27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc2MTkyMjA4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Medical Hold',
    location: 'Veterinary Ward',
    description: 'Elegant Persian cat recovering from minor dental procedure. Needs daily grooming due to long coat.',
    admissionDate: '2025-10-10',
    medicalHistory: ['Neutered', 'Recent dental surgery', 'Requires special diet'],
    vaccinations: [],
    temperament: ['Calm', 'Needs grooming', 'Prefers quiet', 'Gentle']
  },
  {
    id: 'A005',
    name: 'Rocky',
    species: 'Dog',
    breed: 'German Shepherd',
    age: '6 years',
    gender: 'Male',
    weight: '35 kg',
    imageUrl: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZHxlbnwxfHx8fDE3NjE5Mjk1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Downtown Shelter - Wing A',
    description: 'Loyal and intelligent German Shepherd. Trained for basic commands. Best as only pet in household.',
    admissionDate: '2025-09-05',
    medicalHistory: ['Neutered', 'All vaccinations current', 'Previous police training'],
    vaccinations: [],
    temperament: ['Intelligent', 'Loyal', 'Trained', 'Needs experienced owner']
  },
  {
    id: 'A006',
    name: 'Snowball',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: '1 year',
    gender: 'Female',
    weight: '1.5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1695826809809-facc4eb4e85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWJiaXQlMjBidW5ueXxlbnwxfHx8fDE3NjE5MDQzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Small Animals Ward',
    description: 'Adorable Holland Lop rabbit. Very social and enjoys being handled. Needs daily exercise outside cage.',
    admissionDate: '2025-10-15',
    medicalHistory: ['Spayed', 'Vaccinated against RHD', 'Health check completed'],
    vaccinations: [],
    temperament: ['Social', 'Gentle', 'Playful', 'Easy to handle']
  }
];

export const mockVaccinations: Vaccination[] = [
  { id: 'V001', animalId: 'A001', vaccineName: 'DHPP', dateAdministered: '2025-09-20', nextDueDate: '2026-09-20', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-09', status: 'Completed' },
  { id: 'V002', animalId: 'A001', vaccineName: 'Rabies', dateAdministered: '2025-09-20', nextDueDate: '2026-09-20', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-09', status: 'Completed' },
  { id: 'V003', animalId: 'A001', vaccineName: 'Bordetella', dateAdministered: '2025-09-20', nextDueDate: '2025-11-15', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'BORD-2025-09', status: 'Due Soon' },
  { id: 'V004', animalId: 'A002', vaccineName: 'FVRCP', dateAdministered: '2025-10-05', nextDueDate: '2026-10-05', veterinarian: 'Dr. Michael Chen', batchNumber: 'FVRCP-2025-10', status: 'Completed' },
  { id: 'V005', animalId: 'A002', vaccineName: 'Rabies', dateAdministered: '2025-10-05', nextDueDate: '2026-10-05', veterinarian: 'Dr. Michael Chen', batchNumber: 'RAB-2025-10', status: 'Completed' },
  { id: 'V006', animalId: 'A003', vaccineName: 'DHPP', dateAdministered: '2025-08-25', nextDueDate: '2026-08-25', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-08', status: 'Completed' },
  { id: 'V007', animalId: 'A003', vaccineName: 'Rabies', dateAdministered: '2025-08-25', nextDueDate: '2026-08-25', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-08', status: 'Completed' },
  { id: 'V008', animalId: 'A004', vaccineName: 'FVRCP', dateAdministered: '2025-10-12', nextDueDate: '2026-10-12', veterinarian: 'Dr. Michael Chen', batchNumber: 'FVRCP-2025-10B', status: 'Completed' },
  { id: 'V009', animalId: 'A005', vaccineName: 'DHPP', dateAdministered: '2025-09-10', nextDueDate: '2025-11-10', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-09B', status: 'Due Soon' },
  { id: 'V010', animalId: 'A005', vaccineName: 'Rabies', dateAdministered: '2025-09-10', nextDueDate: '2026-09-10', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-09B', status: 'Completed' },
  { id: 'V011', animalId: 'A006', vaccineName: 'RHD', dateAdministered: '2025-10-18', nextDueDate: '2026-10-18', veterinarian: 'Dr. Emily Rodriguez', batchNumber: 'RHD-2025-10', status: 'Completed' },
];

export const mockApplications: AdoptionApplication[] = [
  {
    id: 'APP001',
    animalId: 'A001',
    animalName: 'Max',
    applicantName: 'Jennifer Williams',
    applicantEmail: 'jwilliams@email.com',
    applicantPhone: '555-0123',
    address: '123 Maple Street, Springfield',
    status: 'Pending Review',
    submittedDate: '2025-10-28',
    experience: '10+ years with dogs',
    homeType: 'House with fenced yard',
    hasOtherPets: true
  },
  {
    id: 'APP002',
    animalId: 'A003',
    animalName: 'Bella',
    applicantName: 'Michael Chen',
    applicantEmail: 'mchen@email.com',
    applicantPhone: '555-0124',
    address: '456 Oak Avenue, Springfield',
    status: 'Interview Scheduled',
    submittedDate: '2025-10-25',
    experience: '5 years with Beagles',
    homeType: 'House with yard',
    hasOtherPets: false
  },
  {
    id: 'APP003',
    animalId: 'A002',
    animalName: 'Luna',
    applicantName: 'Sarah Johnson',
    applicantEmail: 'sjohnson@email.com',
    applicantPhone: '555-0125',
    address: '789 Pine Road, Springfield',
    status: 'Approved',
    submittedDate: '2025-10-20',
    experience: 'First-time cat owner',
    homeType: 'Apartment',
    hasOtherPets: false
  },
  {
    id: 'APP004',
    animalId: 'A005',
    animalName: 'Rocky',
    applicantName: 'David Martinez',
    applicantEmail: 'dmartinez@email.com',
    applicantPhone: '555-0126',
    address: '321 Elm Street, Springfield',
    status: 'Pending Review',
    submittedDate: '2025-10-30',
    experience: 'Former K9 handler',
    homeType: 'House with large yard',
    hasOtherPets: false
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'APT001',
    animalId: 'A001',
    animalName: 'Max',
    type: 'Vaccination',
    date: '2025-11-15',
    time: '10:00 AM',
    veterinarian: 'Dr. Sarah Mitchell',
    status: 'Scheduled',
    notes: 'Bordetella booster due'
  },
  {
    id: 'APT002',
    animalId: 'A004',
    animalName: 'Oliver',
    type: 'Checkup',
    date: '2025-11-05',
    time: '2:00 PM',
    veterinarian: 'Dr. Michael Chen',
    status: 'Scheduled',
    notes: 'Post-surgery follow-up'
  },
  {
    id: 'APT003',
    animalId: 'A005',
    animalName: 'Rocky',
    type: 'Vaccination',
    date: '2025-11-10',
    time: '11:30 AM',
    veterinarian: 'Dr. Sarah Mitchell',
    status: 'Scheduled',
    notes: 'DHPP booster'
  },
  {
    id: 'APT004',
    animalId: 'A006',
    animalName: 'Snowball',
    type: 'Checkup',
    date: '2025-11-08',
    time: '3:30 PM',
    veterinarian: 'Dr. Emily Rodriguez',
    status: 'Scheduled',
    notes: 'Routine wellness exam'
  }
];

// Assign vaccinations to animals
mockAnimals.forEach(animal => {
  animal.vaccinations = mockVaccinations.filter(v => v.animalId === animal.id);
});

export const analyticsData = {
  totalAnimals: 48,
  availableForAdoption: 32,
  adoptedThisMonth: 12,
  pendingApplications: 8,
  upcomingVaccinations: 15,
  medicalHolds: 4,
  shelterCapacity: {
    current: 48,
    maximum: 75,
    percentage: 64
  },
  adoptionsByMonth: [
    { month: 'May', adoptions: 8 },
    { month: 'Jun', adoptions: 10 },
    { month: 'Jul', adoptions: 15 },
    { month: 'Aug', adoptions: 12 },
    { month: 'Sep', adoptions: 14 },
    { month: 'Oct', adoptions: 12 }
  ],
  animalsBySpecies: [
    { species: 'Dogs', count: 25 },
    { species: 'Cats', count: 18 },
    { species: 'Rabbits', count: 3 },
    { species: 'Other', count: 2 }
  ],
  vaccinationStatus: [
    { status: 'Up to Date', count: 38 },
    { status: 'Due Soon', count: 7 },
    { status: 'Overdue', count: 3 }
  ]
};
