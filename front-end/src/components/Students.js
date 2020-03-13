import React from 'react';
import axios from 'axios';
import Header from './Header';
import StudentSideList from './StudentSideList';
import StudentItem from './StudentItem';
import StudentList from './StudentList';


class Students extends React.Component {
  constructor() {
    super();
    this.state = {selectedStudent: '', students: [], education: [], work: [], searchStudent: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/student').then((res)=> {
        if(res.status === 200) {
            console.log(res.data.result);
            this.setState({students: res.data.result})
            this.setState({searchStudent: res.data.result});
        }
    }).catch(err => {
        console.log(err);
    })

  }

  onSkillSearch = (list) => {
    this.setState({searchStudent: list})
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
            <h3>Explore Students</h3>
          </b>
        </div>
        <div
          className='container'
          style={{ marginLeft: '40px', marginTop: '30px' }}
        >
          <div style={{ float: 'left', width:'25%', marginLeft: '30px' }}>
            <StudentSideList studentList={this.state.students} onSkillSearch={this.onSkillSearch} />
          </div>
            <div style={{ float: 'left', marginLeft: '15px', width: '65%' }}>
            <div>
            {this.state.searchStudent.map((student) => {
                return ( 
                    <div className='ui raised segment' style={{ height: '110px', marginBottom: '20px'}} >
                        <StudentItem key={student.student_id} student={student} />
                    </div>
                )
            })}
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Students;
