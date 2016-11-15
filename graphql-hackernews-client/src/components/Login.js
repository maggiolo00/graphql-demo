import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NewPost from './NewPost';



const AUTHENTICATE_MUTATION = gql`
    mutation  authenticate($username : String!,  $password : String!){
        authenticateUser(username :$username, password : $password){
            username
            token
        }
    }
`;


const Logged = ({username, handleLogout, onNewPost}) => (
  <IconMenu
    iconButtonElement={
      <IconButton> <MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem primaryText="New Post" onClick={onNewPost}/>
    <MenuItem primaryText="Sign out" onClick={handleLogout}/>
  </IconMenu>
);

Logged.propTypes = {
  username: React.PropTypes.string.isRequired,
  onNewPost: React.PropTypes.func.isRequired
};

const LoggetWithState = connect(
  (state) => (state),
  (dispatch) => ({
    handleLogout(){
      dispatch(logout());
    }
  }),
)(Logged);


const LoginForm = ({handleLogin}) => (
  <Form onSubmit={(e, data) => {
    e.preventDefault();
    handleLogin(data)
  }}>
    <Form.Field>
      <label>Username</label>
      <input name="username" placeholder='Username'/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input name="password" type="password" placeholder='Password'/>
    </Form.Field>
    <Button type='submit'>Login</Button>
  </Form>
)



const LoginFormWithMutation = graphql(AUTHENTICATE_MUTATION, {
  props({ownProps, mutate}) {
    return {
      handleLogin({username, password}) {
        return mutate({
          variables: {username, password}
        }).then(((res)=> {
          ownProps.dispatchLogin(res.data.authenticateUser);
        }));
      },
    };
  },
})(LoginForm);



function logout() {
  return {
    type: 'LOGOUT',
  }
}

function login(token) {
  return {
    type: 'LOGIN_DONE',
    token
  }
}
const LoginFormWithState = connect(
  (state) => (state),
  (dispatch) => ({
    dispatchLogin(token) {
      dispatch(login(token));
    }
  }),
)(LoginFormWithMutation);


class UserButton extends React.Component {
  state = {
    open: false,
    newPost: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpenPost = () => {
    this.setState({newPost: true});
  };
  handleClosePost = () => {

    this.setState({newPost: false});
  };

  render() {


    let LoginComponent;

    let username = this.props.currentUser.username;
    if (username) {
      LoginComponent = <LoggetWithState username={username} onNewPost={this.handleOpenPost}/>
    } else {
      LoginComponent = (
        <div>
          <RaisedButton label="Login" onClick={this.handleOpen}/>
          <Dialog
            title="Login"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}>
            <LoginFormWithState/>
          </Dialog>
        </div>
      );
    }
    return (
      <div>
        {LoginComponent}
        <Dialog
          title="New Post"
          modal={false}
          open={this.state.newPost}
          onRequestClose={this.handleClosePost}
          autoScrollBodyContent={true}>
          <NewPost onComplete={this.handleClosePost}/>
        </Dialog>
      </div>
    );
  }
}

const LoginButtonrWithState = connect(
  (state) => ({currentUser: state.currentUser}),
  (dispatch) => ({}),
)(UserButton);

export default LoginButtonrWithState;