// seed-animals.js
const mongoose = require('mongoose');
const Animal = require('./models/Animal');
const Vaccination = require('./models/Vaccination');
const AddoptionApplication = require('./models/AddoptionApplication');
const Appointment = require('./models/Appointment');
const dotenv = require('dotenv');
dotenv.config();


// ------------------ MOCK ANIMALS ------------------

const mockAnimals = [
  {
    id: "A001",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    weight: "30 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1689185083033-fd8512790d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzYxOTQ2NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Available",
    location: "Downtown Shelter - Wing A",
    description:
      "Friendly and energetic Golden Retriever. Great with kids and other pets. Loves to play fetch and go for long walks.",
    admissionDate: "2025-09-15",
    medicalHistory: ["Neutered", "Heartworm negative", "Dental cleaning completed"],
    vaccinations: [],
    temperament: ["Friendly", "Energetic", "Good with kids", "Trained"]
  },
  {
    id: "A002",
    name: "Luna",
    species: "Cat",
    breed: "Tabby Mix",
    age: "2 years",
    gender: "Female",
    weight: "4 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1625192494235-21e8821040c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTk2NTU0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Available",
    location: "Downtown Shelter - Wing B",
    description:
      "Sweet and affectionate tabby cat. Enjoys cuddles and quiet environments. Perfect lap cat for a calm household.",
    admissionDate: "2025-10-01",
    medicalHistory: ["Spayed", "FIV/FeLV negative", "Microchipped"],
    vaccinations: [],
    temperament: ["Calm", "Affectionate", "Indoor cat", "Quiet"]
  },
  {
    id: "A003",
    name: "Bella",
    species: "Dog",
    breed: "Beagle",
    age: "5 years",
    gender: "Female",
    weight: "12 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1710927865281-9cf4d7ee2782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweXxlbnwxfHx8fDE3NjE5MTEwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Pending",
    location: "Downtown Shelter - Wing A",
    description:
      "Curious and vocal Beagle with a great nose. Needs a home with a fenced yard. Good with other dogs.",
    admissionDate: "2025-08-20",
    medicalHistory: ["Spayed", "Current on all vaccinations", "Hip dysplasia negative"],
    vaccinations: [],
    temperament: ["Curious", "Vocal", "Good with dogs", "Needs exercise"]
  },
  {
    id: "A004",
    name: "Oliver",
    species: "Cat",
    breed: "Persian",
    age: "4 years",
    gender: "Male",
    weight: "5 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1585137173132-cf49e10ad27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc2MTkyMjA4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Medical Hold",
    location: "Veterinary Ward",
    description:
      "Elegant Persian cat recovering from minor dental procedure. Needs daily grooming due to long coat.",
    admissionDate: "2025-10-10",
    medicalHistory: ["Neutered", "Recent dental surgery", "Requires special diet"],
    vaccinations: [],
    temperament: ["Calm", "Needs grooming", "Prefers quiet", "Gentle"]
  },
  {
    id: "A005",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: "6 years",
    gender: "Male",
    weight: "35 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZHxlbnwxfHx8fDE3NjE5Mjk1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Available",
    location: "Downtown Shelter - Wing A",
    description:
      "Loyal and intelligent German Shepherd. Trained for basic commands. Best as only pet in household.",
    admissionDate: "2025-09-05",
    medicalHistory: ["Neutered", "All vaccinations current", "Previous police training"],
    vaccinations: [],
    temperament: ["Intelligent", "Loyal", "Trained", "Needs experienced owner"]
  },
  {
    id: "A006",
    name: "Snowball",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "1 year",
    gender: "Female",
    weight: "1.5 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1695826809809-facc4eb4e85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWJiaXQlMjBidW5ueXxlbnwxfHx8fDE3NjE5MDQzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Available",
    location: "Small Animals Ward",
    description:
      "Adorable Holland Lop rabbit. Very social and enjoys being handled. Needs daily exercise outside cage.",
    admissionDate: "2025-10-15",
    medicalHistory: ["Spayed", "Vaccinated against RHD", "Health check completed"],
    vaccinations: [],
    temperament: ["Social", "Gentle", "Playful", "Easy to handle"]
  }
];
const mockVaccinations = [
  {  animalId: "691d958df24742f1142904cf", vaccineName: 'DHPP', dateAdministered: '2025-09-20', nextDueDate: '2026-09-20', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-09', status: 'Completed' },
  { animalId: "691d958df24742f1142904cf", vaccineName: 'Rabies', dateAdministered: '2025-09-20', nextDueDate: '2026-09-20', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-09', status: 'Completed' },
  {  animalId: "691d958df24742f1142904cf", vaccineName: 'Bordetella', dateAdministered: '2025-09-20', nextDueDate: '2025-11-15', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'BORD-2025-09', status: 'Due Soon' },
  {  animalId: "691d958df24742f1142904d0", vaccineName: 'FVRCP', dateAdministered: '2025-10-05', nextDueDate: '2026-10-05', veterinarian: 'Dr. Michael Chen', batchNumber: 'FVRCP-2025-10', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d0", vaccineName: 'Rabies', dateAdministered: '2025-10-05', nextDueDate: '2026-10-05', veterinarian: 'Dr. Michael Chen', batchNumber: 'RAB-2025-10', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d1", vaccineName: 'DHPP', dateAdministered: '2025-08-25', nextDueDate: '2026-08-25', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-08', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d1", vaccineName: 'Rabies', dateAdministered: '2025-08-25', nextDueDate: '2026-08-25', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-08', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d2", vaccineName: 'FVRCP', dateAdministered: '2025-10-12', nextDueDate: '2026-10-12', veterinarian: 'Dr. Michael Chen', batchNumber: 'FVRCP-2025-10B', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d3", vaccineName: 'DHPP', dateAdministered: '2025-09-10', nextDueDate: '2025-11-10', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'DHPP-2025-09B', status: 'Due Soon' },
  {  animalId: "691d958df24742f1142904d3", vaccineName: 'Rabies', dateAdministered: '2025-09-10', nextDueDate: '2026-09-10', veterinarian: 'Dr. Sarah Mitchell', batchNumber: 'RAB-2025-09B', status: 'Completed' },
  {  animalId: "691d958df24742f1142904d4", vaccineName: 'RHD', dateAdministered: '2025-10-18', nextDueDate: '2026-10-18', veterinarian: 'Dr. Emily Rodriguez', batchNumber: 'RHD-2025-10', status: 'Completed' },
];
const mockApplications= [
  {
    animalId: "691d958df24742f1142904cf",
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
    animalId: "691d958df24742f1142904d1",
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
    animalId: "691d958df24742f1142904d0",
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
    animalId: "691d958df24742f1142904d3",
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
]
const mockAppointments = [
  {
    animalId: "691d958df24742f1142904cf",
    type: 'Vaccination',
    date: '2025-11-15',
    time: '10:00 AM',
    veterinarian: 'Dr. Sarah Mitchell',
    status: 'Scheduled',
    notes: 'Bordetella booster due'
  },
  {
    animalId: "691d958df24742f1142904d2",
    type: 'Checkup',
    date: '2025-11-05',
    time: '2:00 PM',
    veterinarian: 'Dr. Michael Chen',
    status: 'Scheduled',
    notes: 'Post-surgery follow-up'
  },
  {
    animalId: "691d958df24742f1142904d3",
    type: 'Vaccination',
    date: '2025-11-10',
    time: '11:30 AM',
    veterinarian: 'Dr. Sarah Mitchell',
    status: 'Scheduled',
    notes: 'DHPP booster'
  },
  {
    animalId:  "691d958df24742f1142904d4",
    type: 'Checkup',
    date: '2025-11-08',
    time: '3:30 PM',
    veterinarian: 'Dr. Emily Rodriguez',
    status: 'Scheduled',
    notes: 'Routine wellness exam'
  }
];

// ------------------ SEED LOGIC ------------------

async function seedAnimals() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

   console.log("Inserting appointments...");

const appointmentsData = mockAppointments.map(appt => ({
  animalId: appt.animalId, // already a valid ObjectId string
  type: appt.type,
  date: appt.date,
  time: appt.time,
  veterinarian: appt.veterinarian,
  status: appt.status,
  notes: appt.notes
}));

await Appointment.insertMany(appointmentsData);

console.log("Appointments inserted!");





    await mongoose.connection.close();
    console.log("Done. Connection closed.");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedAnimals();
