import { postgressClient } from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthErrorService } from './AuthErrorService';

export const authUser = async (_: any, args: any, ctx: any) => {
  const { email, password } = args.input;

  const checkError = new AuthErrorService();

  const userExist = await postgressClient.users.findFirst({
    where: {
      email: {
        mode: 'insensitive',
      },
    },
  });

  let blocked = await checkError.errorQTD(email);

  if (blocked) {
    return {
      token: '',
      description: {
        message: 'Você excedeu o limite de tentativas de login',
        blocked,
        error: true,
        status: 'error',
      },
    };
  }

  if (!userExist) {
    await checkError.execute({ email, type: 'email' });

    return {
      token: '',
      description: {
        message: 'Usuário ou senha incorretos',
        blocked,
        error: true,
        status: 'error',
      },
    };
  }
  const isPasswordValid = await compare(password, userExist.password);

  if (!isPasswordValid) {
    await checkError.execute({ email, type: 'password' });
    return {
      token: '',
      description: {
        message: 'Usuário ou senha incorretos',
        blocked,
        error: true,
        status: 'error',
      },
    };
  }

  return {
    token: sign({ email }, process.env.secret || 'xablau', {
      expiresIn: '1d',
    }),
    description: {
      message: 'Usuário autorizado',
      blocked,
      error: false,
      status: 'success',
    },
  };
};
