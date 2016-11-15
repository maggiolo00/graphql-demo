import Query from './query.graphql';
import Mutation from './mutation.graphql';
import schema from './schema.graphql';
import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';



let typeDefs = [schema,Query,Mutation];
// console.log(typeDefs);
export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
});