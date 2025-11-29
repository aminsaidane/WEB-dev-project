const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path if needed
require('dotenv').config();

const users = [
  { fullName: 'Dr. Sarah Mitchell', email: 'smitchell@shelter.com', role: 'vet', lastLogin: '2025-11-01', password: 'password123' },
  { fullName: 'Jennifer Williams', email: 'jwilliams@shelter.com', role: 'shelter', lastLogin: '2025-11-01', password: 'password123' },
  { fullName: 'Dr. Michael Chen', email: 'mchen@shelter.com', role: 'vet', lastLogin: '2025-10-31', password: 'password123' },
  { fullName: 'David Martinez', email: 'dmartinez@shelter.com', role: 'adopter', lastLogin: '2025-10-30', password: 'password123' },
  { fullName: 'Dr. Emily Rodriguez', email: 'erodriguez@shelter.com', role: 'vet', lastLogin: '2025-10-31', password: 'password123' },
];

mongoose.connect(process.env.MONGO_URI, {dbName:"shelterDB", useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        const user = new User({
          fullName: u.fullName,
          email: u.email,
          role: u.role,
          lastLogin: u.lastLogin
        });
        await User.register(user, u.password); // hashes the password
        console.log(`User ${u.fullName} created`);
      } else {
        console.log(`User ${u.fullName} already exists`);
      }
    }

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
