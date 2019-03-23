import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import  NewStudentForm from './NewStudentForm.js'
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      isHidden: true
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }
  handleClick(event) {
    return this.setState({
      //isHidden: !this.state.isHidden
      isHidden: ((prevState) => {
        !prevState.isHidden
      })
    })
  }
  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
        <button type="button" onClick={this.handleClick}>Add New Student</button>
        {this.state.isHidden && <NewStudentForm />}

        {/* {this.state.showForm ? <NewStudentForm /> : null}  */}
      </div>

    );
  }
}
