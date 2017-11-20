import React from 'react';
import ReactDOM from 'react-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      admin: false
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

  onAdminCheck(e) {
    this.setState({
      admin: true
    });
  }

  onSubmit() {
    this.props.createUser(this.state.username, this.state.password, this.state.admin);
  }



  render() {
    return (
      <div>
        <div>Signup Form: This will be rendered conditionally</div>
        <label className="signup-username">
          Username: 
          <input type="text" placeholder="username..." onChange={this.onUsernameChange.bind(this)}></input>
        </label>
        <br></br>
        <label className="signup-password">
          Password: 
          <input type="password" placeholder="password..." onChange={this.onPasswordChange.bind(this)}></input>
        </label>
        <br></br>
        <label className="signup-user-type">
          Admin <input type="checkbox" onChange={this.onAdminCheck.bind(this)}></input>
        </label>
        <br></br>
        <button onClick={this.onSubmit.bind(this)}>Create Account</button>
      </div>
    );
  }

}

export default Signup;
