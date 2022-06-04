import userResolver from './User';
import authResolver from './Auth';

export const resolvers = {
  Mutation: {
    ...userResolver,
    ...authResolver,
  },
};
