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
      response: ''
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
    console.log(`RESPONSE VARS:  ${this.props.messageId}, ${this.state.response}, ${this.props.messageName}`);
    this.props.submitAdminResponse(this.props.messageId, this.state.response);
  }

  render() {
    return (
      <FormGroup>
        <div>Respond to {this.props.messageName}'s message:</div>
        <FormControl componentClass="textarea" onChange={this.updateResponse.bind(this)} type="text" placeholder="Response..."></FormControl>
        <br></br>
        <Button bsStyle="primary" onClick={this.sendResponse.bind(this)}>Submit Response</Button>
      </FormGroup>
    );
  }
}

export default Response;