import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { BGGApi } from './src/bgg_api.js';

const BoardGameType = new GraphQLObjectType({
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
})

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      boardgames: {
        type: new GraphQLList(BoardGameType),
        args: {
          query: {
            type: GraphQLString
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
            type: GraphQLID
          }
        },
        resolve(_, { id }) {
          return BGGApi.findBoardGameById(id);
        }
      }
    }
  })
});

import koa from 'koa'; // koa@2
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import koaRouter from 'koa-router'; // koa-router@next
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(koaBody());

router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);