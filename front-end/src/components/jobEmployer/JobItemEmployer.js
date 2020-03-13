import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Button } from 'semantic-ui-react';
import alt from '../../images/alt.png';

class JobItemEmployer extends React.Component {
  constructor() {
    super();
    this.state = { redirect: '', company_name: '' };
  }
  componentDidMount() {
    const id = 2;
    axios
      .get(`http://18.206.154.118:8080/api/employer/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.result);
          this.setState({ company_name: res.data.result[0].company_name });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  onClickHandler = () => {
    this.setState({
      redirect: (
        <Redirect
          to={{
            pathname: '/company/job/applicants',
            state: { job: this.props.job }
          }}
        />
      )
    });
  };

  render() {
    return (
      <div>
        {this.state.redirect}
        <div className='item container'>
          <div
            className='ui tiny image'
            style={{ float: 'left', marginRight: '10px', padding: '5px' }}
          >
            <img src={alt} />
          </div>
          <div className='content'>
            <Button
              color='blue'
              className='ui right floated button'
              onClick={this.onClickHandler}
            >
              View Applicants
            </Button>
            <a className='header'>
              <h4>
                {this.props.job.job_title} | {this.state.company_name} | (Job
                ID: {this.props.job.job_id})
              </h4>
            </a>
            <div className='meta'>
              <div>
                <span className='cinema'>
                  Descriptions: {this.props.job.job_description}
                </span>
              </div>
              <div>
                <span className='cinema'>
                  Job Category: {this.props.job.job_category}
                </span>
              </div>
              <div>
                <span className='cinema'>
                  Location: {this.props.job.job_location}
                </span>
              </div>
            </div>
            <div className='description'>
              <div></div>
            </div>
            <div className='extra'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobItemEmployer;

{
  /* <div>
            {this.state.redirect}
          <div className='item'>
            <div className='ui tiny image'>
              <img src={alt} />
            </div>
            <button
              className='ui right floated basic primary button'
              onClick={this.onClickHandler}
            >
              View Applicants
            </button>
            <div className='middle aligned content'>
              <div className='header'>{this.props.job.job_title}</div>
              <div className='description'>
                <p></p>
              </div>
              <div className='extra'></div>
            </div>
          </div>  
        </div> */
}
