export const responseUserAuth = (ERROR_TYPE: string, token?: string) => {
  const response: any = {
    block: {
      token: '',
      description: {
        message: 'Você excedeu o limite de tentativas de login',
        blocked: true,
        error: true,
        status: 'error',
      },
    },
    notExist: {
      token: '',
      description: {
        message: 'Usuário não encontrado',
        blocked: false,
        error: true,
        status: 'error',
      },
    },
    passwordInvalid: {
      token: '',
      description: {
        message: 'Usuário ou senha incorretos',
        blocked: false,
        error: true,
        status: 'error',
      },
      emailInvalid: {
        token: '',
        description: {
          message: 'E-mail inválido',
          blocked: false,
          error: true,
          status: 'error',
        },
      },
      success: {
        token,
        description: {
          message: 'Usuário autorizado',
          blocked: false,
          error: false,
          status: 'success',
        },
      },
    },
  };

  return response[ERROR_TYPE];
};
