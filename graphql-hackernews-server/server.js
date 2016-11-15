import express from 'express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import OrientDB from 'orientjs';
import cors from 'cors';

import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';


const PORT = 8080;

var app = express();

app.use(cors());

const db = new OrientDB.ODatabase({
  host: 'localhost',
  port: 2424,
  username: 'admin',
  password: 'admin',
  name: 'HackerNews'
});

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const context = {
  db: ()=> {
    return db;
  }
}

app.use('/graphql', bodyParser.json(), graphqlExpress(request =>({schema: schema, context: context})));

app.listen(PORT);
