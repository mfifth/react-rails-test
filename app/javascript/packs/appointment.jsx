import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import { Link } from "react-router-dom";

export default class Appointment extends Component {
  state = {
    appointment: this.props.appointment
  };

  static defaultProps = {
    appointment: {}
  };

  componentDidMount() {
    if (this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done(data => {
        this.setState({ appointment: data });
      });
    }
  }

  render() {
    return (
      <div>
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{this.state.appointment.appt_time}</p>
      </div>
    );
  }
}
