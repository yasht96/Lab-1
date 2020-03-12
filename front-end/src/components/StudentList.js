import React from 'react';
import StudentItem from './StudentItem';
import axios from 'axios';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedStudent: '', students: [], education: [], work: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/student').then((res)=> {
            if(res.status === 200) {
                console.log(res.data.result);
                this.setState({students: res.data.result})
            }
        }).catch(err => {
            console.log(err);
        })

    }
        
    render() {
        return (
            <div>
            {this.state.students.map((student) => {
                return ( 
                    <div className='ui raised segment' style={{ height: '110px', marginBottom: '20px'}} >
                        <StudentItem key={student.student_id} student={student} />
                    </div>
                )
            })}
            </div>
        );
    }
    
}

export default StudentList;