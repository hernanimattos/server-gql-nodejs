import { ErrorHandler } from 'src/modules/error/ErrorHandler';
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
    await mongoClient.$connect();

    console.log('hahahahah');

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
    const error = mongoClient.errors.findMany({
      where: {
        email,
      },
    });

    return (await error).length;
  }
}
