import React, {Component} from 'react';
// id: 1,
//   createdAt: '10/20/2017',
//   first_name: 'Jane',
//   last_name: 'Smith',
//   user_message: 'Test message',
//   user_contact: 'Test contact info',
//   user_urgency: '3',
class Info extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let userDataList = this.props.userData.map(item=> <div key={item.id}>
      <p>item.createdAt</p>
      <p>item.first_name</p>
      <p>item.last_name</p>
      <p>item.user_message</p>
      <p>item.user_contact</p>
      <p>item.user_urgency</p>

    </div> );
    return(
      {userDataList}
    )
  }


}

export default Info;
