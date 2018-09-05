import React from 'react'
import DateTime from 'react-datetime'

export default class AppointmentForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Make a new Appointment</h2>
        <form onSubmit={this.props.handleSubmit}>
          <input
            name='title'
            placeholder='Appointment Title'
            value={this.props.title}
            onChange={this.props.onUserInput} />
          <input
            name='apptTime'
            placeholder="Appointment Time"
            value={this.props.apptTime}
            onChange={this.props.onUserInput} />
          <input type='submit' value='Make Appointment' />
        </form>
      </div>
    )
  }
}
