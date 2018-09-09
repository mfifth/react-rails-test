import React from "react";
import DateTime from "react-datetime";
import { FormErrors } from "./FormErrors";
import moment from "moment";

export default class AppointmentForm extends React.Component {
  state = {
    title: "Morning Coffee",
    apptTime: moment().format(),
    formErrors: {},
    titleValid: true,
    editing: false
  };

  handleUserInput = e => {
    if (e._isAMomentObject) {
      this.setState({ apptTime: e.format() });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        titleValid: this.state.title.length > 5
      });
    }
  };

  addNewError = response => {
    this.setState({ formErrors: response.responseJSON });
  };

  submitForm = e => {
    e.preventDefault();
    this.state.editing ? this.updateAppointment() : this.addAppointment();
  };

  updateAppointment() {
    const appointment = {
      appointment: { title: this.state.title, appt_time: this.state.apptTime }
    };

    $.ajax({
      url: `/appointments/${this.props.match.params.id}`,
      method: "PATCH",
      data: appointment
    })
      .done(this.props.handleNewAppointment)
      .fail(this.addNewError);
  }

  addAppointment() {
    $.post("/appointments", {
      appointment: { title: this.state.title, appt_time: this.state.apptTime }
    })
      .done(this.props.handleNewAppointment)
      .fail(this.addNewError);
  }

  componentDidMount() {
    if (this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done(appointment => {
        this.setState({
          title: appointment.title,
          apptTime: appointment.appt_time,
          editing: this.props.match.path === "/appointments/:id/edit"
        });
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Make a new Appointment</h2>
        <FormErrors formErrors={this.state.formErrors} />
        <h3>
          {this.state.title} {this.state.apptTime}
        </h3>
        <form onSubmit={this.submitForm}>
          <input
            name="title"
            placeholder="Appointment Title"
            value={this.state.title}
            onChange={this.handleUserInput}
          />
          <DateTime
            input={false}
            open={true}
            name="appt_time"
            value={moment(this.state.apptTime)}
            onChange={this.handleUserInput}
          />
          <input
            type="submit"
            value="Make Appointment"
            disabled={!this.state.titleValid}
          />
        </form>
      </div>
    );
  }
}
