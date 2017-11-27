import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Checkbox from 'react-bootstrap/lib/Checkbox';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkPassword: '',
      admin: '',
      firstName: '',
      lastName: ''
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onFirstNameChange(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onLastNameChange(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onCheckPasswordChange(e) {
    this.setState({
      checkPassword: e.target.value
    });
  }  

  onAdminCheck(e) {
    this.setState({
      admin: 'admin'
    });
  }

  onSubmit() {
    if (this.state.username === '') {
      return alert('Oops! Username cannot be empty. Let\'s try that again.');
    }

    if (this.state.firstName === '') {
      return alert('Oops! First name cannot be empty. Let\'s try that again.');
    }

    if (this.state.password.length < 8) {
      return alert('Oops! Password must be at least 8 characters long. Let\'s try that again.');
    }
    if (this.state.password !== this.state.checkPassword) {
      return alert('Oops! Make sure both password fields match.');
    }
    this.props.createUser(this.state.username, this.state.password, this.state.admin, this.state.firstName, this.state.lastName);
  }


  //On deployment: remove option to sign up as an admin. This will be done directly within the database.
  render() {
    return (
      <div className="container signup-container">
        <PageHeader><small>Signup</small></PageHeader>
        <ControlLabel className="signup-username">
          Username<FormControl type="text" placeholder="username..." onChange={this.onUsernameChange.bind(this)}></FormControl>
        </ControlLabel>
        <br></br>
        <ControlLabel className="signup-username">
          First Name<FormControl type="text" placeholder="first name..." onChange={this.onFirstNameChange.bind(this)}></FormControl>
        </ControlLabel>
        <br></br>
        <ControlLabel className="signup-username">
          Last Name<FormControl type="text" placeholder="last name..." onChange={this.onLastNameChange.bind(this)}></FormControl>
        </ControlLabel>
        <br></br>
        <ControlLabel className="signup-password">
          Password<FormControl type="password" placeholder="password..." onChange={this.onPasswordChange.bind(this)}></FormControl>
        </ControlLabel>
        <br></br>
        <ControlLabel className="signup-password">
          Type Password Again<FormControl type="password" placeholder="password..." onChange={this.onCheckPasswordChange.bind(this)}></FormControl>
        </ControlLabel>
        <br></br>
        
        <div className="col-centered">
          <ButtonToolbar>
            <Button className="sign-up-button" bsStyle="primary" onClick={this.onSubmit.bind(this)}>Create Account</Button>
            <Button className="sign-up-button" bsStyle="primary" onClick={this.props.showLogIn}>Return to log in page</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }

}

export default Signup;

// check box removed from line 103...
// (<Checkbox className="admin-checkbox" onChange={this.onAdminCheck.bind(this)}>Administrator</Checkbox>
//         <br></br>)
