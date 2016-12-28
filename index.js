import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
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