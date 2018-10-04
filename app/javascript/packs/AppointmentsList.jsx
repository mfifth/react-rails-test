import React, { Component } from "react";
import Appointment from "./Appointment";

export class AppointmentsList extends Component {
  render() {
    return (
      <div className="appointments-list">
        {this.props.appointments.map(function(appointment) {
          return <Appointment appointment={appointment} key={appointment.id} />;
        })}
      </div>
    );
  }
}
