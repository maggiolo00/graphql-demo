create class User extends V
create property User.username STRING;
create property User.id STRING;

create index User.id on User (id) UNIQUE_HASH_INDEX;
create index User.username on User (username) UNIQUE_HASH_INDEX;

create class Post extends V
create property Post.id STRING;
create property Post.title STRING;
create property Post.body STRING;
create property Post.date DATETIME;

create index Post.id on Post (id) UNIQUE_HASH_INDEX;

create index Post.t_b on Post (title,body) FULLTEXT ENGINE LUCENE;

create class Comment extends V
create property Comment.id STRING;
create property Comment.body STRING;
create property Comment.date DATETIME;

create class HasAuthor extends E
create class HasComments extends E




begin

let $user = create vertex User set username = 'user1',id =  UUID()
let $user1 = create vertex User set username = 'user2',id =  UUID()

let $post = create vertex Post set date = sysdate(), title = 'First Post' , id =  UUID()
let $e1 = create edge HasAuthor from $post to $user


let $comment = create vertex Comment set date = sysdate(), body = 'First Comment' , id =  UUID()
let $e2 = create edge HasAuthor from $comment to $user1


let $e3 = create edge HasComments from $post to $comment;


let $comment1 = create vertex Comment set date = sysdate(), body = 'First Reply Comment' , id =  UUID()
let $e4 = create edge HasAuthor from $comment1 to $user

let $e5 = create edge HasComments from $comment to $comment1;


commit