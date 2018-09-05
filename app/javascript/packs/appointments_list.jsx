import React from 'react'
import Appointment from './appointment'

export class AppointmentsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.appointments.map(function(appointment, i){
          return (
            <Appointment key={`appointment-${i}`} appointment={appointment} />
          )
        })}
      </div>
    )
  }
}
