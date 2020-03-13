import React from 'react';

class EventSideList extends React.Component {
  constructor() {
    super();
    this.state = {event: ''}
  }
  onChangeEvent = (e) => {
    this.setState({event: e.target.value}, () => {
      const list = this.props.eventList.filter((item) => {
        if(item.event_name.search(this.state.event) != -1) {
          return item;
        }
      })
      this.props.onEventSearch(list);
    })
  }
  render() {
    return (
      <div className='ui segment' style={{width: '400px'}} >
        <div className='ui divided list'>
          <div className='item' style={{marginTop: '5px'}} >
            <div className='content'>
              <div className='header'>Your Upcoming Events</div>
              <div>
                  <br></br>
              You have no upcoming events.
              </div>
              <div>
              <div class="ui category search">
                <div class="ui icon input">
                  <input class="prompt" type="text" placeholder="Search events..." onChange={this.onChangeEvent} />
                    <i class="search icon"></i>
                </div>
              <div class="results"></div>
                </div>
                  <a >Find some events</a>
              </div>
            </div>
          </div>
          <div className='item' style={{marginTop: '10px'}}>
            <div className='content'>
              <div className='header'>Your Upcoming Appointments</div>
              <div>
                  <br></br>
              Request an appointment.
              </div>
              <div>
              <i aria-hidden="true" className="search icon"></i>
                  <a >Find some events</a>
              </div>
            </div>
          </div>
          <div className='item' style={{marginTop: '10px'}}>
            <div className='content'>
              <div className='header'>Your Upcoming Career Fairs</div>
              <div>
                  <br></br>
              Find some career fairs.
              </div>
              <div>
              <i aria-hidden="true" className="search icon"></i>
                  <a >Find some events</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
};

export default EventSideList;