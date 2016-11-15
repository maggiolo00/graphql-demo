import Query from './query';
import Mutation from './mutation';
import Post from './post';
import Comment from './comment';


const resolveFunctions = {
  Query: Query,
  Mutation: Mutation,
  Post: Post,
  Comment: Comment,
  Date: {
    __parseValue(value) {
      return new Date(value); // value from the client
    },
    __serialize(value) {
      return value.toJSON();
    }
  }
};


export default resolveFunctions;