import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';



const GET_POST_LISTS = gql`
    query{
        posts {
            id
            title
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
      <List>
        <Subheader>Posts</Subheader>
        {this.props.posts.map((post, idx)=> {
          return <ListItem key={post.id} onClick={this.openPost.bind(this, post.id) } primaryText={post.title}/>
        })}
      </List>
    )
  }
}

Posts.propTypes = {
  router: React.PropTypes.object.isRequired
};


export default withPosts(Posts);