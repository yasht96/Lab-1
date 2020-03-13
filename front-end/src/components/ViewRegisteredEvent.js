import React from 'react';
import axios from 'axios';
import Header from './Header';
import ButtonMenu from './ButtonMenu';
import RegisteredEventItem from './RegisteredEventItem';
import EventSideList from './EventSideList';

class ViewRegisteredEvent extends React.Component {
  constructor() {
    super();
    this.state = { registeredEvents: [] };
  }

  componentDidMount() {
    const id = 16;
    axios
      .get(`http://18.206.154.118:8080/api/event/registered/student/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ registeredEvents: res.data.result });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div
          className='ui segment'
          style={{ marginTop: '0px', paddingLeft: '40px' }}
        >
          <b>
            <h3>Registered Events</h3>
          </b>
        </div>
        <div className='container'>
          <div className='ui items' style={{ float: 'left', width: '60%' }}>
            {this.state.registeredEvents.map(event => {
              return (
                <div
                  className='ui raised segment '
                  style={{
                    marginTop: '40px',
                    marginLeft: '40px',
                    marginBottom: '20px',
                    marginRight: '20px',
                    paddingTop: '10px'
                  }}
                >
                  <RegisteredEventItem key={event.event_id} event={event} />
                </div>
              );
            })}
          </div>
          <div
            style={{
              float: 'left',
              marginTop: '60px',
              marginLeft: '30px',
              marginRight: '40px'
            }}
          >
            <EventSideList />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewRegisteredEvent;
