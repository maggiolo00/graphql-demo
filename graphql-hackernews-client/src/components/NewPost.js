import React from 'react';
import {connect} from 'react-redux';
import {Button, Form} from 'semantic-ui-react'
import {Segment} from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router'

const NEW_POST_MUTATION = gql`
    mutation  createNewPost($token : String!,$title : String!,  $body : String){
        createPost(title : $title,body : $body, token :$token){
            id
        }
    }
`;
const NewPost = ({handleSubmit, token}) => (

  <Segment basic padded>
    <Form onSubmit={(e, data) => {
      e.preventDefault();
      handleSubmit(Object.assign({}, data, {token: token}));
    }}>
      <Form.Field>
        <input name="title" placeholder='Title'/>
      </Form.Field>
      <Form.TextArea placeholder='Description' name="body"/>
      <Button type='submit'>Create Post</Button>
    </Form>
  </Segment>
)

const NewPostWithState = connect(
  (state) => ({token: state.currentUser.token}),
  (dispatch) => ({}),
)(NewPost);

const NewPostWithMutation = graphql(NEW_POST_MUTATION, {
  props({ownProps, mutate}) {

    return {
      handleSubmit({title, body, token}) {
        return mutate({
          variables: {title, body, token}
        }).then(((res)=> {
          const id = res.data.createPost.id;
          ownProps.onComplete();
          ownProps.router.push(`/posts/${id}`);
        }));
      },
    };
  },
})(NewPostWithState);


NewPostWithMutation.propTypes = {
  onComplete: React.PropTypes.func.isRequired
};
export default withRouter(NewPostWithMutation);