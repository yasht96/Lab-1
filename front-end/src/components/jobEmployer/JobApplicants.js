import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../Header';
import JobItemApplicant from './JobItemApplicant';

class JobApplicants extends React.Component {
  constructor() {
    super();
    this.state = { applications: [], redirect: '' };
  }
  componentDidMount() {
    if (this.props.location.state == undefined) {
      this.setState({ redirect: <Redirect to='/company/job/view' /> });
    } else {
      const id = this.props.location.state.job.job_id;
      axios
        .get(`http://18.206.154.118:8080/api/application/job/${id}`)
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
  }
  render() {
    return (
      <div>
        {this.state.redirect}
        <div>
          <Header />
        </div>
        <div
          className='ui segment'
          style={{ marginTop: '0px', paddingLeft: '40px' }}
        >
          <b>
            <h3>
              Applications for Job ID: {this.props.location.state.job.job_id}
            </h3>
          </b>
        </div>
        <div>
          {this.state.redirect == '' &&
            this.state.applications.map(application => {
              return (
                <div
                  className='ui raised segment'
                  style={{ marginLeft: '20px', width: '70%' }}
                >
                  <JobItemApplicant
                    key={application.application_id}
                    application={application}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default JobApplicants;
