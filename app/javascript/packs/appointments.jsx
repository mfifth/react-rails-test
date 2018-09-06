import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppointmentForm } from "./appointment_form";
import { AppointmentsList } from "./appointments_list";
import { FormErrors } from "./form_errors";

class Appointments extends Component {
  state = {
    appointments: this.props.appointments,
    title: "Morning Meeting",
    apptTime: "9AM",
    formErrors: {}
  };

  handleUserInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addNewAppointment(appointment) {
    this.setState({
      appointments: [...this.state.appointments, appointment],
      formErrors: {}
    });
  }

  addNewError(response) {
    this.setState({ formErrors: response.responseJSON });
  }

  submitForm(e) {
    e.preventDefault();

    const appointment = {
      title: this.state.title,
      appt_time: this.state.apptTime
    };

    $.post("/appointments", { appointment })
      .done(this.addNewAppointment.bind(this))
      .fail(this.addNewError.bind(this));
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.title} {this.state.apptTime}
        </h1>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          title={this.state.title}
          apptTime={this.state.apptTime}
          onUserInput={this.handleUserInput.bind(this)}
          handleSubmit={this.submitForm.bind(this)}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("appointments_data");
  const data = JSON.parse(node.getAttribute("data"));

  ReactDOM.render(
    <Appointments appointments={data} />,
    document.body.appendChild(document.createElement("div"))
  );
});
