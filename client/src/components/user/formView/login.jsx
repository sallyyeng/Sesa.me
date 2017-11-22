import React from 'react';
import ReactDOM from 'react-dom';

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
      <div>
        <div>Login</div>
        <label className="login-username">Username:<input type="text" placeholder="username..." onChange={this.onUsernameChange.bind(this)}></input></label>
        <br></br>
        <label className="login-password">Password:<input type="password" placeholder="password..." onChange={this.onPasswordChange.bind(this)}></input></label>
        <br></br>
        <button className="login-button" onClick={this.onSubmit.bind(this)}>Log In</button>
        <br></br>
        <p>Don't have an account?  Sign up:</p>
        <button onClick={this.props.showSignUp}>Signup</button>
      </div>
    );
  }

}

export default Login;
