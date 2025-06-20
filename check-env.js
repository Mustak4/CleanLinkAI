require('dotenv').config();

console.log('Attempting to read DATABASE_URL...');
const dbUrl = process.env.DATABASE_URL;

if (dbUrl) {
  console.log('Success! DATABASE_URL is:', dbUrl);
} else {
  console.error('Error: DATABASE_URL is not defined or could not be read.');
} 