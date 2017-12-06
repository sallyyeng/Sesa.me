import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import moment from 'moment';
import $ from 'jquery';
import Info from './info.jsx';
import Map from './map.jsx';
import DataMap from './datamap.jsx';
import ChatBox from '../user/formView/chatBox.jsx';
import Users from './usersinfo.jsx';


class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {resArr: [], location: null, lat: null, long: null, userArr: [], room: 'starter'};
    this.changeRoom = this.changeRoom.bind(this);
  }

  renderUserMap(location, lat, long) {
    lat = Number(lat);
    long = Number(long);
    console.log('COORDINATES', lat, long);
    $.ajax({
      url: '/location',
      data: {lat, long},
      type: 'GET',
      success: resArr=>{
        console.log('RESPONSE... ');
        console.log(resArr);
        this.setState({resArr, location, lat, long});
      }
    });
  }


  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    setTimeout(
      this.getData.bind(this), 2000);

  }

  getData() {
    $.ajax({
      url: '/userData',
      type: 'GET',
      success: userArr=>{
        // console.log('All user data???');
        this.setState({userArr});
      },
      error: (error) => {
        console.log(error.responseText);
      }
    });
  }

  changeRoom(newUser, ) {
    console.log('CHANGING THE ROOM');
    this.setState({room: newUser.room});

    return new Promise((resolve, reject) =>{
      $.ajax({
        url: '/userData',
        type: 'POST',
        data: newUser,
        success: userData=>{
          console.log('All user data???', userData);
          this.setState({
            userArr: [userData],
            location: userData.location,
            lat: userData.lat,
            long: userData.long,
          }, () => {
            resolve(userData);
          });

        },
        error: (error) => {
          console.log(error.responseText);
          reject();
        }
      });
    });


    // this.setState({userArr: [newUser.userInfo]})

  }

  render() {
    const userArr = this.state.userArr.map((user, i)=>(
      <div key={i} style={{border: '1px solid black', fontSize: '15px', padding: '40px'}}
        onClick={this.renderUserMap.bind(this, user.location, user.lat, user.long)}>
        <p> <b>Username:</b> {user.username}</p>
        <p> <b>First name:</b> {user.first_name} </p>
        <p> <b>Lastname:</b> {user.last_name} </p>
        <p> <b>Location:</b> {user.location ? user.location : 'no location entered'} </p>
        <p style={{display: 'none'}}> <b>Lat:</b> {user.lat} </p>
        <p style={{display: 'none'}}> <b>Long:</b> {user.long} </p>
        <p> <b>Account created at:</b> {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} </p>
        <p> <b>Account updated at:</b> {moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')} </p>
      </div>
    ));
    return (
      <div>
        <div className="wrapperAdmin">
          <div className="boxAdmin headerAdmin">
            <div>
            Dashboard
            </div>
            <div>
              <a style={{float: 'right'}} href="/">Logout</a>
            </div>

          </div>
          <div className="boxAdmin sidebarAdmin">
            Users
            <div>
              <Users changeRoom={this.changeRoom} location={this.state.location} lat={this.state.lat} long={this.state.long} renderUserMap={this.renderUserMap.bind(this)} />
            </div>

          </div>
          <div className="boxAdmin contentAdmin">
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tab eventKey={1} title="User Map">
                {this.state.resArr.length > 0 ?
                  <Map geolocationInfo={this.state}/> : <div style={{padding: '20px'}}>
                    <h3>Please click on a user to display user location and services nearby</h3></div>
                }
              </Tab>
              <Tab eventKey={2} title="Data Map">
                <DataMap/>
              </Tab>
            </Tabs>
            <br /></div>
          <div className="boxAdmin footerAdmin">
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tab eventKey={1} title="Chat">
                <ChatBox username={this.props.username} room={this.state.room} />
              </Tab>
              <Tab eventKey={2} title="Info">
                <div className="userInfo">
                  {userArr}
              </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );

  }

}


export default AdminView;
