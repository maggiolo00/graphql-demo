import React, {Component} from 'react';
import Header from './Header';

class MainLayout extends Component {

  render() {
    return (
      <div>
        <Header router={this.props.router}/>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}
export default MainLayout;