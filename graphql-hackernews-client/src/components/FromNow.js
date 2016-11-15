import Moment from 'moment';
import React from 'react';

const FromNow = ({date}) => (
  <span>{Moment(date).fromNow()}</span>
);

FromNow.propTypes = {
  date: React.PropTypes.string.isRequired
};

export default FromNow

