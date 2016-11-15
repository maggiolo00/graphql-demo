import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import LoginButton from './Login';

class Header extends Component {


  home() {
    this.props.router.push("/");
  }

  render() {


    return (
      <AppBar
        title="GraphQL News"
        iconElementRight={<LoginButton/>} onLeftIconButtonTouchTap={this.home.bind(this)}
      />
    )
  }
}


Header.propTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;