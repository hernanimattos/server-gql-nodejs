import { postgressClient } from '../../../database/prismaClient';
import { hash } from 'bcrypt';
import { ErrorHandler } from '../../error/ErrorHandler';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: ICreateUser) {
    const userExists = await postgressClient.users.findFirst({
      where: {
        name: {
          mode: 'insensitive',
        },
        email,
      },
    });

    if (userExists) {
      throw new ErrorHandler('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    return postgressClient.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
