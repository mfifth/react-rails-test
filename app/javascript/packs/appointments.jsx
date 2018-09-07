import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import { AppointmentForm } from "./AppointmentForm";
import { AppointmentsList } from "./AppointmentsList";
import { FormErrors } from "./FormErrors";

export default class Appointments extends Component {
  state = {
    appointments: this.props.appointments,
    title: "Morning Meeting",
    apptTime: "9AM",
    formErrors: {},
    formValid: true
  };

  static defaultProps = {
    appointments: []
  };

  handleUserInput(e) {
    if (e._isAMomentObject) {
      this.setState({ apptTime: e.format() });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        formValid: this.state.title.length > 5
      });
    }
  }

  setApptTime(e) {
    console.log(e);
    this.setState({ apptTime: e.format() });
    console.log(this.state);
  }

  addNewAppointment(appointment) {
    this.setState({
      appointments: [...this.state.appointments, appointment],
      formErrors: {} // Reset form errors
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
        <h1>
          {this.state.title} {this.state.apptTime}
        </h1>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          title={this.state.title}
          apptTime={this.state.apptTime}
          onUserInput={this.handleUserInput.bind(this)}
          onDateChange={this.setApptTime.bind(this)}
          handleSubmit={this.submitForm.bind(this)}
          formValid={this.state.formValid}
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
    <AppRouter appointments={data} />,
    document.body.appendChild(document.createElement("div"))
  );
});
