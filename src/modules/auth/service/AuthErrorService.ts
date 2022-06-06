import { ErrorHandler } from '../../../modules/error/ErrorHandler';
import { mongoClient } from '../../../database/prismaClient';

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
    console.log(
      '🚀 ~ file: AuthErrorService.ts ~ line 10 ~ AuthErrorService ~ execute ~ email',
      email
    );

    await mongoClient.$connect();

    const error = await mongoClient.errors.create({
      data: {
        email,
        type,
      },
    });

    console.log(
      '🚀 ~ file: AuthErrorService.ts ~ line 16 ~ ErrosManager ~ execute ~ userErrorExists',
      error
    );
  }

  async errorQTD(email: string) {
    return mongoClient.errors.findMany({
      where: {
        email,
      },
    });
  }
}
