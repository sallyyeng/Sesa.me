import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit() {
    this.props.logInUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="container login-container">
        <PageHeader><small>Login to report a bug:</small></PageHeader>
        <ControlLabel className="login-username inline-el">Username:</ControlLabel>
        <FormControl className="inline-el" type="text" placeholder="username..." onChange={this.onUsernameChange.bind(this)}></FormControl>
        <br></br>
        <ControlLabel className="login-password inline-el">Password:</ControlLabel>
        <FormControl className="inline-el" type="password" placeholder="password..." onChange={this.onPasswordChange.bind(this)}></FormControl>
        <br></br>
        <Button bsStyle="primary" className="login-button" onClick={this.onSubmit.bind(this)}>Log In</Button>
        <br></br>
        <PageHeader><small>Don't have an account?  Sign up:</small></PageHeader>
        <Button bsStyle="primary" onClick={this.props.showSignUp}>Signup</Button>
      </div>
    );
  }

}

export default Login;
