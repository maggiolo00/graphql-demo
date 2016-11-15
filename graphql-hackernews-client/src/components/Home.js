import React, {Component} from 'react';
import Posts from './Posts';

class Home extends Component {




  render() {
    return (
      <div>
        <Posts router={this.props.router}/>
      </div>
    )
  }
}

export default Home;