import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Game from './components/user/tictactoeView/game.jsx';
import Login from './components/user/formView/login.jsx';
import Signup from './components/user/formView/signup.jsx';
import Submission from './components/user/formView/submission.jsx';
import AdminView from './components/admin/adminView.jsx';
import UserResponses from './components/user/formView/userResponses.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      type: '',
      showForms: false,
      //Possible view values:
        // restricted: only render game
        // unrestricted: render game, login and signup buttons (after user has clicked button 10x)
        // login: render login component (if user clicks on login button)
        // signup: render signup component (if user clicks on signup button OR creates an account, will be redirected)
        // submissions: render sumbissions component (if user is successfully logged in)
      view: 'restricted',
      showBugButton: false
    }

    this.unlockForms = this.unlockForms.bind(this);
    this.onEsc = this.onEsc.bind(this);
    this.hideBugButton = this.hideBugButton.bind(this);
    this.showAdminResponses = this.showAdminResponses.bind(this);
    this.showSubmissionForm = this.showSubmissionForm.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onEsc, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onEsc, false);
  }

  //MAKE SURE THIS INTERACTS CORRECTLY WITH SERVER/DB

  createUser(username, hash, admin) {
    console.log(` ${username}, ${hash}, ${admin} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        hash: hash,
        account_type: admin
      },
      success: (data) => {
        alert('You have successfully created an account');
        console.log('success');
        this.setState({
          view: 'login'
        });
      },
      error: (error) => {
        console.log(error);
        alert('Woops, looks like that username is already taken!');
        this.setState({
          view: 'signUp'
        });
      }
    });
  }

  logInUser(username, hash) {
    console.log(`${username}, ${hash} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        username: username,
        hash: hash
      },
      success: (data) => {
        alert('You have successfully logged in');
        this.setState({
          view: 'submission',
          username: data.username,
          type: data.account_type
          // should this recieve data from db to set state values for type (admin?) and username???
        });
        console.log('LOGIN STATE', this.state);
      },
      error: (error) => {
        alert('Incorrect password');
        console.log('Unsuccessful login with error: ', error);
      }
    });
  }

  sendMessage(username, first, last, contact, urgency, message) {
    console.log(`${username}, ${first}, ${last}, ${contact}, ${urgency}, ${message} requested post to server as new message`);
    $.ajax({
      method: 'POST',
      url: '/submissions',
      data: {
        username: username,
        first_name: first,
        last_name: last,
        user_contact: contact,
        user_urgency: urgency,
        user_message: message
      },
      success: (data) => {
        console.log(data);
        alert('Your message was sent succesfully. Check back often for status updates.');
      },
      error: (error) => {
        console.log('Error sending message with', error);
      }
    });
  }

  retrieveResponses(username, callback) {
    console.log(`in retrieveResponses with ${username}`);
    $.ajax({
      method: 'GET',
      url: '/submissions?username=' + username + '&account_type=null',
      success: (data) => {
        console.log('USER MESSAGES', data);
        callback(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  retrieveOpenMessages(callback) {
    console.log(`in retrieveAllResponses`);
    $.ajax({
      method: 'GET',
      url: '/submissions?username=' + this.state.username + '&account_type=' + this.state.type,
      success: (data) => {
        console.log(data);
        callback(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  submitAdminResponse(id, response) {
    console.log(`in submitAdminResponse with ${id}, ${response}`);
    $.ajax({
      method: 'PATCH',
      url: '/submissions',
      data: {
        id: id,
        admin_response: response
      },
      success: (data) => {
        console.log(data);
        alert('Your response was sent successfully');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  markAsComplete(id) {
    console.log(`in markAsComplete with ${id}`);
    $.ajax({
      method: 'PATCH',
      url: '/submissions',
      data: {
        id: id,
        admin_complete: true
      },
      success: (data) => {
        console.log(data);
        alert('This messages has been marked as complete. It will no longer appear in your inbox.')
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  hideBugButton(){
    this.setState({
      showBugButton: false
    });
  }

  showLogIn() {
    this.setState({
      view: 'login',
      showBugButton: false
    });
  }

  showSignUp() {
    this.setState({
      view: 'signup'
    });
  }

  showAdminResponses(){
    this.setState({
      view: 'responses'
    });
  }

  showSubmissionForm(){
    this.setState({
      view: 'submission'
    });
  }

  unlockForms(){
    this.setState({showBugButton: true});
  }

  onEsc(e){
    if(e.keyCode === 27) {
      this.setState({view: 'restricted'});
    }
  }


  render() {
    if (this.state.showBugButton === true) {
      return <div>
        <Game/>
        <p>It looks like you've found a bug.  Would you like to report it?</p>
        <button onClick={this.showLogIn.bind(this)}>yes</button>
        <button onClick={this.hideBugButton}>no</button>
      </div>;

    } else if (this.state.view === 'login') {
      return (<div>
        <Game/>
        <div>
          <h3>Login or signup to report a bug:</h3><br/>
          <Login logInUser={this.logInUser.bind(this)} showSignUp={this.showSignUp.bind(this)}/>
        </div>

      </div>);
    } else if (this.state.view === 'signup') {
      return (<div>
        <Game/>
        <div>
          <h3>Signup:</h3>
          <br></br>
          <Signup createUser={this.createUser.bind(this)} showLogIn={this.showLogIn.bind(this)}/>
        </div>
      </div>)

    } else if(this.state.view === 'submission' && this.state.type === 'admin') {
      return (
        <div>
          <AdminView markAsComplete={this.markAsComplete.bind(this)} submitAdminResponse={this.submitAdminResponse.bind(this)} retrieveOpenMessages={this.retrieveOpenMessages.bind(this)}/>
        </div>);

    } else if(this.state.view === 'submission') {
      return (
        <div>
          <Game/>
          <div>
            <Submission username={this.state.username} sendMessage={this.sendMessage.bind(this)} retrieveResponses={this.retrieveResponses.bind(this)} showAdminResponses={this.showAdminResponses}/>
          </div>
        </div>);

    } else if(this.state.view === 'responses'){
      return(
        <div>
         <Game/>
         <div>
           <UserResponses showSubmissionForm={this.showSubmissionForm} retrieveResponses={this.retrieveResponses.bind(this)} username={this.state.username}/>
         </div>
        </div> 
        );  
    } else if(this.state.view === 'restricted') {
      return (
        <div>
          <Game unlockForms={this.unlockForms}/>
        </div>);
    }
    return (
      <div>
        <Game unlockForms={this.unlockForms}/>
        
        <button onClick={this.showLogIn.bind(this)}>Log In</button>
        <button onClick={this.showSignUp.bind(this)}>Sign Up</button>
        <Login logInUser={this.logInUser.bind(this)} showSignUp={this.showSignUp.bind(this)}/>
        <Signup createUser={this.createUser.bind(this)}/>
        <Submission username={this.state.username} sendMessage={this.sendMessage.bind(this)} retrieveResponses={this.retrieveResponses.bind(this)}/>
        <AdminView markAsComplete={this.markAsComplete.bind(this)} submitAdminResponse={this.submitAdminResponse.bind(this)} retrieveOpenMessages={this.retrieveOpenMessages.bind(this)}/>

      </div>
    )
  }

} 
  
ReactDOM.render(<App/>, document.getElementById('app'));