import koa from 'koa';
import koaBody from 'koa-bodyparser';
import koaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import { schema } from './src/schema';

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(koaBody());

router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);