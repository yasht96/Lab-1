import React from 'react';
import CompanyHeader from '../CompanyHeader';
import axios from 'axios';
import EventItemEmployer from './EventItemEmployer';

class ViewEventEmployer extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    const id = 2;
    axios
      .get(`http://18.206.154.118:8080/api/event/company/${id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ posts: res.data.result }, () => {
            console.log(this.state.posts);
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

        {this.state.posts.map(post => {
          return (
            <div
              className='ui raised segment'
              style={{ marginLeft: '20px', width: '70%' }}
            >
              <EventItemEmployer key={post.event_id} event={post} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ViewEventEmployer;
