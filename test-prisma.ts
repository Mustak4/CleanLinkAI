import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to database!');
    await prisma.$disconnect();
  } catch (err) {
    console.error('Failed to connect:', err);
  }
}

main();