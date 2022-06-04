import { postgressClient } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ErrorHandler } from '../../error/ErrorHandler';
import { AuthErrorService } from './AuthErrorService';

interface IAuthUser {
  email: string;
  password: string;
}
export class AuthService {
  async execute({ email, password }: IAuthUser) {
    const checkError = new AuthErrorService();

    const userExist = await postgressClient.users.findFirst({
      where: {
        email: {
          mode: 'insensitive',
        },
      },
    });

    if (!userExist) {
      await checkError.execute({ email, type: 'email' });
      throw new ErrorHandler('User not found');
    }
    const isPasswordValid = await compare(password, userExist.password);

    if (!isPasswordValid) {
      await checkError.execute({ email, type: 'password' });
      throw new ErrorHandler('Invalid password');
    }

    return sign({ email }, process.env.secret || 'xablau', {
      expiresIn: '1d',
    });
  }
}
