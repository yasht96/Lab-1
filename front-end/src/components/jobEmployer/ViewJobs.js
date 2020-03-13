import React from 'react';
import CompanyHeader from '../CompanyHeader';
import axios from 'axios';
import JobItemEmployer from './JobItemEmployer';

class ViewJobs extends React.Component {
  constructor() {
    super();
    this.state = { jobs: [] };
  }

  componentDidMount() {
    const id = 2;
    axios
      .get(`http://18.206.154.118:8080/api/job/postings/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ jobs: res.data.result }, () => {
            console.log(this.state.jobs);
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
          <CompanyHeader />
        </div>
        <div
          className='ui segment'
          style={{
            marginTop: '0px',
            paddingLeft: '40px',
            marginBottom: '20px'
          }}
        >
          <b>
            <h3>Job Postings</h3>
          </b>
        </div>
        {this.state.jobs.map(job => {
          return (
            <div
              className='ui raised segment'
              style={{ marginLeft: '20px', width: '70%', marginBottom: '20px' }}
            >
              <JobItemEmployer key={job} job={job} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ViewJobs;
