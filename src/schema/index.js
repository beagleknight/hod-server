import { GraphQLSchema }    from 'graphql';

import { RootQueryType }    from '../types/root_query.js';
import { RootMutationType } from '../types/root_mutation.js';

require('dotenv').config();

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
