let MY_PRIVATE_KEY = "MY_PRIVATE_KEY";
import Cripto from 'crypto';
import JWT from 'jsonwebtoken';

let Mutation = {
  createPost(obj, {token, title, body}, context){
    body = body || "";
    let {username}  = JWT.verify(token, MY_PRIVATE_KEY);
    let statement = context.db()
      .let("post", `create vertex Post set id = UUID(), title = "${title}" , body = "${body}" , date = sysdate()`)
      .let("currentUser", `select from User where username = "${username}"`)
      .let("authoring", `create edge HasAuthor from $post to $currentUser`)
      .commit(100)
      .return('$post')
    return statement.one()
  },
  commentPost(obj, {token, postId, body}, context){

    let {username}  = JWT.verify(token, MY_PRIVATE_KEY);
    let statement = context.db()
      .let("comment", `create vertex Comment set id = UUID() , body = "${body}" , date = sysdate()`)
      .let("currentUser", `select from User where username = "${username}"`)
      .let("post", `select from Post where id = "${postId}"`)
      .let("authoring", `create edge HasAuthor from $comment to $currentUser`)
      .let("posting", `create edge HasComments from $post to $comment`)
      .commit(100)
      .return('$comment')

    return statement.one()
  },
  replyComment(obj, {token, commentId, body}, context){

    let {username}  = JWT.verify(token, MY_PRIVATE_KEY);
    let statement = context.db()
      .let("comment", `create vertex Comment set id = UUID() , body = "${body}" , date = sysdate()`)
      .let("currentUser", `select from User where username = "${username}"`)
      .let("reply", `select from Comment where id = "${commentId}"`)
      .let("authoring", `create edge HasAuthor from $comment to currentUser`)
      .let("posting", `create edge HasComments from $comment to $reply`)
      .commit(100)
      .return('$reply')
    return statement.one()
  },
  authenticateUser(obj, {username, password}, context) {

    let db = context.db();
    let promise = new Promise((resolve, reject) => {
      db.select().from('User').where({username: username}).one().then((res) => {
        crypto(res.salt, password).then((dk) => {
          if (res.password === dk) {
            let token = JWT.sign({username: res.username}, MY_PRIVATE_KEY);
            resolve({username: res.username, token: token});
          } else {
            reject("Invalid Password");
          }
        });
      });
    })
    return promise;
  },
  registerUser(obj, args, context) {

    args.salt = salt();
    const p = new Promise((resolve, reject)=> {
      crypto(args.salt, args.password).then((dk)=> {
        let db = context.db();
        args.id = db.rawExpression("UUID()");
        args.password = dk;
        db.insert().into("User").set(args).one().then((user)=> {
          let token = JWT.sign({username: user.username}, MY_PRIVATE_KEY);
          resolve({
            username: user.username,
            token: token
          })
        }).catch(reject);
      })
        .catch(reject);
    })


    return p;
  },
}

function salt() {
  return Cripto.randomBytes(128).toString('base64');
}
function crypto(salt, password) {
  let p = new Promise((resolve, reject)=> {
    Cripto.pbkdf2(password, salt, 10000, 512, function (err, dk) {
      if (err) {
        reject(err)
      }
      resolve(dk.toString('base64'));
    });
  })
  return p;
}

export default Mutation;