import { postgressClient } from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthErrorService } from './AuthErrorService';
import { responseUserAuth } from './utils';

enum ERROR_TYPE {
  block = 'block',
  notExist = 'notExist',
  passwordInvalid = 'passwordInvalid',
  success = 'success',
}

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
    return responseUserAuth(ERROR_TYPE.block);
  }

  if (!userExist) {
    return responseUserAuth(ERROR_TYPE.notExist);
  }
  const isPasswordValid = await compare(password, userExist.password);

  if (!isPasswordValid) {
    await checkError.execute({ email, type: 'password' });
    return responseUserAuth(ERROR_TYPE.passwordInvalid);
  }

  const token = sign({ email }, process.env.secret || 'xablau', {
    expiresIn: '1d',
  });

  return responseUserAuth(ERROR_TYPE.success, token);
};
