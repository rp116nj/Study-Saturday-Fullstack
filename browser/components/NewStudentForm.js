import React, { Component } from 'react'


export default class NewStudentForm extends Component{
  render() {
    return (
      <div>
        <form onSubmit ={this.handleSubmit}>
          <label htmlFor="firstName">FirstName:</label>
          <input name="firstName" type="text" />
          <label htmlFor="lastName">LastName:</label>
          <input name="lastName" type="text" />
          <label htmlFor="email">Email:</label>
          <input name="email" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
