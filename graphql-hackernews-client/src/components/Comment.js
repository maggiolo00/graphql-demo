import FromNow from './FromNow';
import React from 'react';
import {Comment} from 'semantic-ui-react'

const SingleComment = ({comment}) => (
  <Comment>
    <Comment.Content>
      <Comment.Author as='a'>{comment.user.username}</Comment.Author>
      <Comment.Metadata>
        <FromNow date={comment.date}/>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
      <Comment.Actions>
        <a>Reply</a>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
)

SingleComment.propTypes = {
  comment: React.PropTypes.object.isRequired
};

export default  SingleComment;
