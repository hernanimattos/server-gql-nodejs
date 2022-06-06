import { ErrorHandler } from '../../modules/error/ErrorHandler';
import { mongoClient } from '../../database/prismaClient';

enum ErroType {
  EMAIL,
  PASSWORD,
}
interface IErrorService {
  email: string;
  type: string;
}

export class AuthErrorService {
  constructor() {
    mongoClient.$connect();
  }
  async execute({ email, type }: IErrorService) {
    await mongoClient.errors.create({
      data: {
        email,
        type,
      },
    });
  }

  async errorQTD(email: string): Promise<any> {
    const error = mongoClient.errors.findMany({
      where: {
        email,
      },
    });

    return (await error).length > 2 ? true : false;
  }
}
