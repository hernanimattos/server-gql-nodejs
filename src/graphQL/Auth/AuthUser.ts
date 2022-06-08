import { Context } from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { responseUserAuth } from './utils';

enum ERROR_TYPE {
  block = 'block',
  notExist = 'notExist',
  passwordInvalid = 'passwordInvalid',
  success = 'success',
}

interface IErrormanager {
  email: string;
  type: string;
}

const errorCreate = async (input: IErrormanager, ctx: Context) => {
  ctx.prismaMongo.$connect();
  const { email, type } = input;

  ctx.prismaMongo.errors.create({
    data: {
      email,
      type,
    },
  });
  ctx.prismaMongo.$disconnect();
};

const errorQTD = async (email: string, ctx: Context) => {
  ctx.prismaMongo.$connect();
  const error = ctx.prismaMongo.errors.findMany({
    where: {
      email,
    },
  });
  ctx.prismaMongo.$disconnect();

  return (await error).length > 2 ? true : false;
};

export const authUser = async (_: any, args: any, ctx: Context) => {
  const { email, password } = args.input;

  const userExist = await ctx.prismaPostgress.users.findFirst({
    where: {
      email: {
        mode: 'insensitive',
      },
    },
  });

  let blocked = await errorQTD(email, ctx);

  if (blocked) {
    return responseUserAuth(ERROR_TYPE.block);
  }

  if (!userExist) {
    return responseUserAuth(ERROR_TYPE.notExist);
  }
  const isPasswordValid = await compare(password, userExist.password);

  if (!isPasswordValid) {
    await errorCreate({ email, type: 'password' }, ctx);
    return responseUserAuth(ERROR_TYPE.passwordInvalid);
  }

  const token = sign({ email }, process.env.secret || 'xablau', {
    expiresIn: '1d',
  });

  return responseUserAuth(ERROR_TYPE.success, token);
};
