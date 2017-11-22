import React from 'react';
import Response from './response.jsx';

class UserResponses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			responses: []
		}
	}

  componentDidMount() {
    console.log('USER PROPS', this.props);
    this.props.retrieveResponses(this.props.username, (data) => {
      console.log('USER MESSAGES ON SUB COMPONENT', data);
      this.setState({
        responses: data
      });
    });
  }

	render(){
		return (
			<div className="user-status-main">
	          <h5>Correspondence history:</h5>
	          <ul>
	            {this.state.responses.map((response, index) => {
	              return <Response key={JSON.stringify(response)} response={response}/>
	            })}
	          </ul>
        	</div>);
	}
}

export default UserResponses;