import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { UserType } from './user.js';

import { facebookApi } from '../services/facebook_api.js';

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
        return facebookApi.getUserData(token);
      }
    }
  }
});
