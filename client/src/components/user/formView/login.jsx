import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Login Form: This will be rendered conditionally</div>
        <label className="login-username">Username: <input type="text" placeholder="username..."></input></label>
        <br></br>
        <label className="login-password">Password: <input type="password" placeholder="password..."></input></label>
      </div>
    );
  }

}

export default Login;
