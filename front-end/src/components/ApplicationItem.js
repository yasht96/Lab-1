import React from 'react';
import axios from 'axios';
import alt from '../images/alt.png';

class ApplicationItem extends React.Component {
  constructor() {
    super();
    this.state = {job_title: '', application_deadline: '', company_name: ''};
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/job/${this.props.application.job_id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ job_title: res.data.result[0].job_title });
          this.setState({application_deadline: res.data.result[0].job_application_deadline})
        }
      })
      .catch(err => {
        console.log(err);
      });

      axios
      .get(`http://localhost:3000/api/employer/${this.props.application.company_id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({company_name : res.data.result[0].company_name });
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
          <img src={alt}/>
        </div>
        <div className='content'>
          <a className='header'><h4>{this.state.job_title}</h4></a>
          <div className='meta'>
            <span className='cinema'>
              {this.state.company_name}
            </span>
          </div>
          <div className='description'>
            <div>
              <i className='info icon' />
              Status: {this.props.application.application_status}
            </div>
            <div>
              <i className='check icon' />
              Applied: {this.props.application.application_date} - Application Closed: {this.state.application_deadline}
            </div>
          </div>
          <div className='extra'>
            
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationItem;

{/* <div>
        {this.state.redirect}
        <div className='item'>
          <div className='ui tiny image'>
            <img src={alt} />
          </div>
          <div className='middle aligned content'>
            <div className='header'>{this.props.application.job_id}</div>
            <div className='description'>
            <p>{this.state.company_name}</p>
            </div>
            <div className='extra'></div>
          </div>
        </div>
      </div> */}