import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import alt from '../images/alt.png';

class RegisteredEventItem extends React.Component {
    constructor() {
        super();
        this.state = {event_name: '', event_description: '', event_timing: '', event_location: ''};
    }
    componentDidMount() {
        const id = this.props.event.event_id;
        axios
      .get(`http://localhost:3000/api/event/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ event_name: res.data.result[0].event_name, event_description: res.data.result[0].event_description, event_timing: res.data.result[0].event_timing, event_location: res.data.result[0].event_location });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    render() {
        return (
            <div className='item container'>
            <div
              className='ui tiny image'
              style={{marginRight: '10px', float: 'left' }}
            >
              <img src={alt} />
            </div>
            <div className='content' >
              <a className='header'><h4>{this.state.event_name}</h4></a>
              <div className='meta'>
                <span className='cinema'>
                  {this.state.event_description}
                  </span>
              </div>
              <div className='description'> 
                <div>
                  Location: {this.state.event_location}
                </div>
              </div>
              <div className='extra'>
                
              </div>        
            </div>
          </div>
          );
    }
  
};

export default RegisteredEventItem;

{/* <div class='item'>
        <div class='ui tiny image' >
          <img src={alt} />
        </div>
        <Link to={{pathname: '/student/event', state: {event : props.event}}}>
        <button class='ui right floated basic primary button' >View Event</button>
        </Link>
        <div class='middle aligned content'>
          <div class='header'>Content B</div>
          <div class='description'>
            <p></p>
          </div>
          <div class='extra'></div>
        </div>
      </div> */}