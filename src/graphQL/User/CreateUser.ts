import { Context } from '../../database/prismaClient';
import { hash } from 'bcrypt';
import { ErrorHandler } from '../../modules/error/ErrorHandler';

export const createUser = async (_: any, args: any, ctx: Context) => {
  const { input } = args;
  const { name, email, password } = input;

  const userExists = await ctx.prismaPostgress.users.findFirst({
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

  return ctx.prismaPostgress.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};
