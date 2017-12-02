import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleLogout() {
    return new Promise((resolve, reject) => {
      this.setState({username: 'Login'});
      $.ajax({
        url: '/logout',
        method: 'GET',
        contentType: 'application/json',
        success: response => {
          console.log('success inside handleLogout: ');
          console.log(response);
        },
        error: (err)=> {
          console.log(`failure inside handleLogout: ${err}`);
        }
      });
    });
  }

  render() {
    //This button redirrects the user to the Signup page
    const ButtonLogout = withRouter(({ history }) => (
      <Button
        className="logout-button"
        bsStyle="primary"
        onClick={()=> {
          this.handleLogout()
            .then(() => history.push('/Login'))
            .catch((err)=> console.log(err.responseText));
        }}>
        Logout</Button>
    ));

    return (
      <ButtonLogout />
    );
  }
}

export default Logout;
