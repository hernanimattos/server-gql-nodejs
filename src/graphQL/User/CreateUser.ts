import { postgressClient } from '../../database/prismaClient';
import { hash } from 'bcrypt';
import { ErrorHandler } from '../../modules/error/ErrorHandler';

export const createUser = async (_: any, args: any, ctx: any) => {
  const { input } = args;
  const { name, email, password } = input;
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
};
