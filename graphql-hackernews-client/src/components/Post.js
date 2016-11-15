import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import CircularProgress from 'material-ui/CircularProgress';
import Comments from './Comments';
import {Item} from 'semantic-ui-react'
import FromNow from './FromNow';
import {Segment} from 'semantic-ui-react'


const GET_POST_WITH_ID = gql`
    query postById($postId : ID!) {
        postById(id : $postId) {
            id
            title
            date
            body
            comments {
                id
                body
                date
                user {
                    username
                }
            }
            author {
                username
            }
        }
    }
`;

class Post extends Component {

  render() {

    if (this.props.postLoading) {
      return <CircularProgress size={80} thickness={5}/>
    }
    let {post} = this.props;
    return (
      <Segment padded>
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Header as='a'>{post.title}</Item.Header>
              <Item.Meta>{post.body}</Item.Meta>
              <Item.Description>
              </Item.Description>
              <Item.Extra>{ post.author.username} - <FromNow date={post.date}/></Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Comments post={post}/>
      </Segment>
    )
  }
}

const PostWithData = graphql(GET_POST_WITH_ID, {
  props: ({ownProps, data}) => {
    if (data.loading) {
      return {
        postLoading: true
      }
    }
    return {
      post: data.postById
    }
  },
  options: ({postId}) => ({variables: {postId}})
})(Post);


class PostComponent extends Component {

  render() {

    return (
      <PostWithData postId={this.props.params.postId}/>
    )
  }
}


export default PostComponent;