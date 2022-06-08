import { PrismaClient as PrismaClientMongo } from '../../prisma/generated/prismaMongo';
import { PrismaClient as PrismaClientPostgress } from '../../prisma/generated/prismaPostgres';

const postgressClient = new PrismaClientPostgress({
  datasources: { db: { url: process.env.DATABASE_URL_POSTGRES } },
});
const mongoClient = new PrismaClientMongo({
  datasources: { db: { url: process.env.DATABASE_URL_MONGOBD } },
});


export interface Context {
  prismaMongo: PrismaClientMongo
  prismaPostgress: PrismaClientPostgress
}

export const context: Context = {
  prismaMongo: mongoClient,
  prismaPostgress: postgressClient
}

export { postgressClient, mongoClient };
