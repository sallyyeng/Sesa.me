import React from 'react';

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
        //may have to change 'data' depending on what format the data is returned as
        responses: data
      });
    });
  }

	render(){
    console.log('hey im the responses in the render function: ', this.state.responses);
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