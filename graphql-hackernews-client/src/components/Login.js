import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';





const AUTHENTICATE_MUTATION = gql`
    mutation  authenticate($username : String!,  $password : String!){
        authenticateUser(username :$username, password : $password){
            username
            token
        }
    }
`;


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


class LoginButton extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {


    let LoginComponent;

    if (this.props.currentUser.username) {
      LoginComponent = (<FlatButton label={this.props.currentUser.username}/>);
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
      </div>
    );
  }
}

const LoginButtonrWithState = connect(
  (state) => ({currentUser: state.currentUser}),
  (dispatch) => ({}),
)(LoginButton);

export default LoginButtonrWithState;