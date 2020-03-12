import React from 'react';
import axios from 'axios';
import Header from './Header';
import ApplicationItem from './ApplicationItem';
import ApplicationSideList from './ApplicationSideList';

class Application extends React.Component {
  constructor() {
    super();
    this.state = {applications: []};
  }
  componentDidMount() {
      const id = 16;
    axios
      .get(`http://localhost:3000/api/application/apply/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ applications: res.data.result }, () => {
            console.log(this.state.applications);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
        <div style={{ float: 'left', width:'25%', marginLeft: '30px', marginTop: '20px' }}>
            <ApplicationSideList />
        </div>
        <div style={{float: 'left',  marginLeft: '10px', width: '70%', marginTop: '20px' }}>
        {this.state.applications.map(application => {
            return (
              <div
                className='ui raised segment'
                style={{width: '75%' }}
              >
                <ApplicationItem key={application.application_id} application={application} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    );
  }
}

export default Application;