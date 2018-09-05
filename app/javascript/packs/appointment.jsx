import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'

export default class Appointment extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.appointment.title}</h3>
        <p>{this.props.appointment.appt_time}</p>
      </div>
    )
  }
}
