let Comment = {
  user(comment, args, context){
    let commentRid = comment["@rid"];
    return context.db().select("expand(out('HasAuthor'))").from(`${commentRid}`).one();
  },
  replies(comment, args, context){
    let commentRid = comment["@rid"];
    return context.db().select("expand(out('HasComments'))").from(`${commentRid}`).all();
  }
}

export default Comment;