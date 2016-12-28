import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql';

export const BoardGameType = new GraphQLObjectType({
  name: "BoardGame",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    minPlayers: {
      type: GraphQLInt
    },
    maxPlayers: {
      type: GraphQLInt
    },
    imageUrl: {
      type: GraphQLString
    },
    thumbUrl: {
      type: GraphQLString
    }
  }
});
