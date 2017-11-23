import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  //when admin types a response, updates state variable response
  updateResponse(e) {
    this.setState({
      response: e.target.value
    });
  }

  //when admin submits a response, calls the submitAdminResponse method to send id and response to server as a patch request
  sendResponse() {
    this.props.submitAdminResponse(this.state.messageId, this.state.response);
  }

  render() {
    return (
      <div>
        <div className="admin-response-main">
          <h5>New Response</h5>
          <FormGroup>
            <ControlLabel className="message">Respond to message:</ControlLabel>
            <br></br>
            <FormControl componentClass="textarea" onChange={this.updateResponse.bind(this)} type="text" placeholder="Response..."></FormControl>
            <br></br>
            <Button onClick={this.sendResponse.bind(this)}>Submit Response</Button>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Response;