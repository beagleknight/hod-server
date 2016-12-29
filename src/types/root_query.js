import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { BGGApi } from './../services/bgg_api.js';

import { BoardGameType } from './board_game.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    boardgames: {
      type: new GraphQLList(BoardGameType),
      args: {
        query: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(_, { query }) {
        return BGGApi.search(query);
      }
    },
    boardgame: {
      type: BoardGameType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, { id }) {
        return BGGApi.findBoardGameById(id);
      }
    }
  }
});
