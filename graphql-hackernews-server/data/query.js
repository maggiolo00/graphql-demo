let Query = {
  postById(obj, args, context, fieldASTs) {
    return context.db().select().from('Post')
      .where(args).one();
  },

  posts(obj, {text}, context, fieldASTs) {
    if (text) {
      return context.db().select().from('Post').lucene('title', 'body', `${text}`).all()
    } else {
      return context.db().select().from('Post').all()
    }

  }
};


export default Query