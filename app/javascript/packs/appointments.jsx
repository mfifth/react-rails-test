import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import AppointmentForm from "./AppointmentForm";
import { AppointmentsList } from "./AppointmentsList";
import { getAppointments } from "./UserLogic";

export default class Appointments extends Component {
  state = {
    appointments: this.props.appointments
  };

  static defaultProps = {
    appointments: [],
    formErrors: {}
  };

  handleAppointment = appointment => {
    this.setState({
      appointments: [...this.state.appointments, appointment],
      formErrors: {}
    });
  };

  componentDidMount() {
    if (this.props.match) {
      $.ajax({
        type: "GET",
        url: "/appointments",
        dataType: "JSON"
      })
        .success(data => {
          console.log(data);
          this.setState({ appointments: data });
        })
        .error(errors => {
          console.log(errors);
        });
    }
  }

  render() {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.handleAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    );
  }
}
