import React from 'react';
import { Item } from 'semantic-ui-react';

class JobSearchBar extends React.Component {
  constructor() {
    super();
    this.state = {job: ''}
  }

  onChangeJobSearch = (e) => {
    this.setState({job: e.target.value}, () => {
      const list = this.props.jobList.filter((item) => {
        if(item.job_title.toLowerCase().search(this.state.job) != -1) {
          return Item;
        }
      })
      this.props.jobSearch(list);
    })
  }

  onFilter = () => {
    const list = this.props.jobList.filter((item) => {
      if(item.job_title.toLowerCase().search(this.state.job) != -1 && item.job_category.search('Intern') != -1) {
        return Item;
      }
    })
    this.props.jobSearch(list);
  }

  render() {
    return (
      <div
        className='ui raised segment'
        style={{
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '20px',
          height: '24%'
        }}
      >
        <div>
          <div style={{ width: '48%', float: 'left' }}>
            <div className='ui icon input' style={{ width: '100%' }}>
              <input
                type='text'
                placeholder='Job titles, employers, or keywords'
                value={this.state.value}
                onChange={this.onChangeJobSearch}
              />
              <i className='search icon'></i>
            </div>
          </div>
          <div
            style={{
              width: '48%',
              float: 'right',
              marginLeft: '20px'
            }}
          >
            <div className='ui icon input' style={{ width: '100%' }}>
              <input
                type='text'
                placeholder='City, State, Zip Code, or Address'
              />
              <i className='search icon'></i>
            </div>
          </div>
        </div>
        <div>
          <div
            role='list'
            className='ui bulleted horizontal link list'
            style={{ marginTop: '10px' }}
          >
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              software
            </a>
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              computer science
            </a>
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              developer
            </a>
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              information technology
            </a>
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              data science
            </a>
            <a role='listitem' className='item' style={{ color: '#1E90FF' }}>
              machine learning
            </a>
          </div>
        </div>
        <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <button className='ui blue basic button' style={{borderRadius: '25px'}} >Full-Time Job</button>
          <button className='ui blue basic button' style={{marginLeft: '10px', borderRadius: '25px'}}>Part-Time</button>
          <button className='ui blue basic button' style={{marginLeft: '10px', borderRadius: '25px'}} onClick={this.onFilter}>Internship</button>
          <button className='ui blue basic button' style={{marginLeft: '10px', borderRadius: '25px'}}>On-Campus</button>
          <button className='ui blue basic button' style={{marginLeft: '10px', borderRadius: '25px'}}>
              <i class="filter icon"></i>
                  Filters
          </button>
          <button className='ui blue right floated basic button' style={{marginLeft: '10px', borderRadius: '25px'}}>My Favorite Jobs</button>
        </div>
      </div>
    );
  }
  
};

export default JobSearchBar;
