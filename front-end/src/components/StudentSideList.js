import React from 'react';

class StudentSideList extends React.Component {
  constructor() {
    super();
    this.state = {skill: ''}
  }
  onChangeSkill = (e) => {
    this.setState({skill: e.target.value}, () => {
      const list = this.props.studentList.filter((item) => {

        if(item.skillSet != null && item.skillSet.search(this.state.skill) != -1) {
          return item;
        }
      })
      this.props.onSkillSearch(list);
    })
  }
  render() {
    return (
      <div className='ui vertical menu' style={{ width: '250px' }}>
        <div className='item'>
          <div className='header'>Filters</div>
        </div>
        <div className='item'>
          <div className='header'>Skill</div>
          <div class='ui search'>
            <div class='ui icon input' style={{ marginTop: '10px' }}>
              <input class='prompt' type='text' value={this.state.skill} placeholder='Enter a Skill...' onChange={this.onChangeSkill} />
              <i class='search icon'></i>
            </div>
            <div class='results'></div>
          </div>
        </div>
        <div className='item'>
          <div className='header'>Schools</div>
          <div class='ui checkbox' style={{marginBottom: '10px'}} >
            <input type='checkbox' name='example' />
            <label style={{fontSize: '13px'}} >San Jose State University Only</label>
          </div>
        </div>
        <div className='item'>
        <div className='header'>Alumini</div>
          <div class='ui checkbox' style={{marginBottom: '10px'}} >
            <input type='checkbox' name='example' />
            <label style={{fontSize: '13px'}} >Alumini Only</label>
          </div>
        </div>
        <div className='item'>
          <div className='header'>Support</div>
          <div className='menu'>
            <a className='item'>E-mail Support</a>
            <a className='item'>FAQs</a>
          </div>
        </div>
        <div className='item'>
          <div className='header'>Schools</div>
        </div>
        <div className='item'>
          <div className='header'>Support</div>
          <div className='menu'>
            <a className='item'>E-mail Support</a>
            <a className='item'>FAQs</a>
          </div>
        </div>
      </div>
    );
  }
  
};

export default StudentSideList;
