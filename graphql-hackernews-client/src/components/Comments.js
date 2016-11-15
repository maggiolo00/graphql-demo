import React from 'react'
import {Button, Comment, Form} from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import SingleComment from './Comment';
import {connect} from 'react-redux';
import update from 'react-addons-update';


const COMMENT_POST_MUTATION = gql`
    mutation  commentPostWithToken($token : String!,$postId :ID!,$body : String!){
        commentPost(token :$token,postId : $postId, body : $body){
            id
            date
            body
        }
    }
`;

const Comments = ({post, submit}) => (
  <Comment.Group minimal>
    <Form reply onSubmit={(e, data) => {
      e.preventDefault();
      submit(Object.assign({}, data));
    }}>
      <Form.TextArea name="body"/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
    </Form>
    {post.comments.map(comment => <SingleComment key={comment.id} comment={comment}/>)}
  </Comment.Group>
)

Comments.propTypes = {
  post: React.PropTypes.object.isRequired
};


const CommentsWithMutations = graphql(COMMENT_POST_MUTATION, {
  props({ownProps, mutate}) {


    return {
      submit({body}) {
        let token = ownProps.currentUser.token;
        let postId = ownProps.post.id;
        return mutate({
          variables: {token, postId, body},
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   commentPost: {
          //     __typename: 'Comment',
          //     createdAt: +new Date(),
          //     body: "Body",
          //   },
          // },
          updateQueries: {
            postById: (prev, {mutationResult}) => {
              let newComment = mutationResult.data.commentPost;
              return update(prev, {
                postById: {
                  comments: {
                    $unshift: [newComment],
                  },
                },
              });
            },
          },
        });
      },
    };
  },
})(Comments);

const CommentsWithMutationsAndState = connect(
  (state) => ({currentUser: state.currentUser}),
  (dispatch) => ({}),
)(CommentsWithMutations);

export default CommentsWithMutationsAndState


