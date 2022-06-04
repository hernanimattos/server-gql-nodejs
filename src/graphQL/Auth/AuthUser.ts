import { postgressClient } from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthErrorService } from './AuthErrorService';

interface IResponse {
  token: string;
  error: string;
  errrQtd: number;
}
export const authUser = async (_: any, args: any, ctx: any) => {
  let errorQtd: number;
  const { email, password } = args.input;

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
    errorQtd = await checkError.errorQTD(email);
    return {
      token: '',
      error: 'Invalid password',
      errorQtd,
    };
  }
  const isPasswordValid = await compare(password, userExist.password);

  if (!isPasswordValid) {
    await checkError.execute({ email, type: 'password' });
    errorQtd = await checkError.errorQTD(email);
    return {
      token: '',
      error: 'Invalid password',
      errorQtd,
    };
  }

  return {
    token: sign({ email }, process.env.secret || 'xablau', {
      expiresIn: '1d',
    }),
    error: 'Invalid password',
    errorQtd: 0,
  };
};
