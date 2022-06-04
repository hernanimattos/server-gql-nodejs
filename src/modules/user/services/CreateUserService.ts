import { postgressClient } from '../../../database/prismaClient';
import { hash } from 'bcrypt';
import { ErrorHandler } from 'src/modules/error/ErrorHandler';

interface ICreateUser {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, userName, email, password }: ICreateUser) {
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
        username: userName,
        email,
        password: hashedPassword,
      },
    });
  }
}
