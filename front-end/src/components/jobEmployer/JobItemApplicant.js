import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import alt from '../../images/alt.png';

class JobItemApplicant extends React.Component {
  constructor() {
    super();
    this.state = { student_name: '', college_name: '', major: '', student: '' };
  }

  componentDidMount() {
    const id = this.props.application.student_id;
    axios
      .get(`http://18.206.154.118:8080/api/student/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            student: res.data.result[0],
            student_name: res.data.result[0].student_name,
            college_name: res.data.result[0].student_college_name,
            major: res.data.result[0].major
          });
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
          style={{ float: 'left', marginRight: '10px' }}
        >
          <img src={alt} style={{ borderRadius: '50%' }} />
        </div>
        <div className='content'>
          <Link
            to={{
              pathname: '/company/job/student/application',
              state: { student: this.state.student }
            }}
          >
            <button className='ui right floated basic primary button'>
              View Details
            </button>
          </Link>
          <a className='header'>
            <h4>
              {this.state.student_name} | Application ID:{' '}
              {this.props.application.application_id}
            </h4>
          </a>
          <div className='meta'>
            <span className='cinema'>{this.state.college_name}</span>
          </div>
          <div className='description'>
            <div>{this.state.major}</div>
          </div>
          <div className='extra'></div>
        </div>
      </div>
    );
  }
}

export default JobItemApplicant;

{
  /* <div>
      <div className='item'>
        <div className='ui tiny image'>
          <img src={alt} />
        </div>
        <button className='ui right floated basic primary button'>
          Update Status
        </button>
        <div className='middle aligned content'>
          <div className='header'>{props.application.application_id}</div>
          <div className='description'>
            <p></p>
          </div>
          <div className='extra'></div>
        </div>
      </div>
    </div> */
}
