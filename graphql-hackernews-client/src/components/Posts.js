import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';
import {List} from 'semantic-ui-react'
import FromNow from './FromNow';
import {Segment} from 'semantic-ui-react'



const GET_POST_LISTS = gql`
    query{
        posts {
            id
            title
            date
        }
    }
`;

const withPosts = graphql(GET_POST_LISTS, {
  props: ({ownProps, data}) => {
    if (data.loading) {
      return {
        postLoading: true
      }
    }

    return {
      posts: data.posts
    }
  }
})
class Posts extends Component {

  openPost(id) {
    this.props.router.push(`/posts/${id}`);
  }

  render() {

    if (this.props.postLoading) {
      return <CircularProgress size={80} thickness={5}/>
    }

    return (
      <Segment padded>
        <List divided relaxed>
          {this.props.posts.map((post)=> {
            return (
              <List.Item key={post.id} onClick={this.openPost.bind(this, post.id)}>
                <List.Content>
                  <List.Header as='a'>{post.title}</List.Header>
                  <List.Description as='a'><FromNow date={post.date}/></List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Segment>
    )
  }
}

Posts.propTypes = {
  router: React.PropTypes.object.isRequired
};


export default withPosts(Posts);