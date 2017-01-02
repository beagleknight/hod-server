import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { UserType } from './user.js';
import { User }     from '../models/user.js';

export const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUserFromFacebook: {
      type: UserType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(_, { token }) {
        return User.findOrCreateFromFacebook(token);
      }
    }
  }
});
