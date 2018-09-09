import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import AppointmentForm from "./AppointmentForm";
import { AppointmentsList } from "./AppointmentsList";

export default class Appointments extends Component {
  state = {
    appointments: this.props.appointments
  };

  static defaultProps = {
    appointments: [],
    formErrors: {}
  };

  addNewAppointment = appointment => {
    this.setState({
      appointments: [...this.state.appointments, appointment],
      formErrors: {} // Reset form errors
    });
  };

  componentDidMount() {
    if (this.props.match) {
      $.ajax({
        type: "GET",
        url: "/appointments",
        dataType: "JSON"
      }).done(data => {
        this.setState({ appointments: data });
      });
    }
  }

  render() {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("appointments_data");
  const data = JSON.parse(node.getAttribute("data"));

  ReactDOM.render(
    <AppRouter appointments={data} />,
    document.body.appendChild(document.createElement("div"))
  );
});
