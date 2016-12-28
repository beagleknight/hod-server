import { GraphQLSchema } from 'graphql';

import { RootQueryType } from '../types/root_query.js';

export const schema = new GraphQLSchema({
  query: RootQueryType
});
