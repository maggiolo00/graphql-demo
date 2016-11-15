let Post = {
  author(post, args, context){
    let postRid = post["@rid"];
    return context.db().select("expand(out('HasAuthor'))").from(`${postRid}`).one();
  },
  comments(post, args, context){
    let postRid = post["@rid"];
    return context.db().select("expand(out('HasComments'))").from(`${postRid}`).order("date desc").all();
  }
}


export default Post;