import React from 'react'
import DateTime from 'react-datetime'

export class AppointmentForm extends React.Component {
  setApptTime = (e) => {
    console.log(e)
    this.setState({appt_time: this._d})
  }

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

          <DateTime
            input={false}
            open={true}
            name='appt_time'
            value={this.props.appt_time}
            onChange={this.setApptTime} />

          <input type='submit' value='Make Appointment' />
        </form>
      </div>
    )
  }
}
