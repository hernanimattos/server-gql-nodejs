import { PrismaClient as PrismaClientMongo } from '../../prisma/generated/prismaMongo';
import { PrismaClient as PrismaClientPostgress } from '../../prisma/generated/prismaPostgress';

const postgressClient = new PrismaClientPostgress({
  datasources: { db: { url: process.env.DATABASE_URL_POSTGRES } },
});
const mongoClient = new PrismaClientMongo({
  datasources: { db: { url: process.env.DATABASE_URL_MONGOBD } },
});

export { postgressClient, mongoClient };
