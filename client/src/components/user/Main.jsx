import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import {Link} from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="main">
          <div className="container">
            <div className="row-align-items-center">
              <img width={420} height={200} src="https://i.imgur.com/tmuMHgG.gif" />
              <div className="btn-group-sm" role="group" aria-label="Basic example">
                <Link to='/Login'>
                  <Button type="button" className="btn btn-secondary">Login</Button>
                </Link>
                <Link to='/Signup'>
                  <Button type="button" className="btn btn-secondary">Sign-Up</Button>
                </Link>
            <Link to='/PacManGame'>
              <Button type="button" className="btn btn-secondary">PacMan</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
    <Link to='/AdminLogin'>
      <Button bsStyle="link" className="admin-loggin-button-real">Admin Login</Button>
    </Link>
  </div>
  )};
}

export default Main;


  <Link to='/SignUp'>

  </Link>
