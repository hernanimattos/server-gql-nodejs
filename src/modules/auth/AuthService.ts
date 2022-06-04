import { postgressClient, mongoClient } from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ErrorHandler } from '../error/ErrorHandler';

interface IAuthUser {
  username: string;
  password: string;
}
export class AuthService {
  async execute({ username, password }: IAuthUser) {
    await mongoClient.$connect();

    const userExist = await postgressClient.users.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    });

    if (!userExist) {
      throw new ErrorHandler('User not found');
    }
    const isPasswordValid = await compare(password, userExist.password);

    if (!isPasswordValid) {
      throw new ErrorHandler('Invalid password');
    }

    return sign({ username }, process.env.secret || 'xablau', {
      expiresIn: '1d',
    });
  }
}