import React from 'react'
import ReactDOM from 'react-dom'
import AppointmentForm from './appointment_form'
import { AppointmentsList } from './appointments_list'
import update from 'immutability-helper'

export default class Appointments extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
      appointments: this.props.appointments,
      title: "Morning Meeting",
      apptTime: "Tomorrow at 9AM"
		}
	}

  handleUserInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    var appointment = {title: this.state.title, appt_time: this.state.apptTime}
    $.post('/appointments', {appointment: appointment})
  }

  render() {
    return (
      <div>
        <h1>{this.state.title} {this.state.apptTime}</h1>
        <AppointmentForm
          title={this.state.title}
          apptTime={this.state.apptTime}
          onUserInput={this.handleUserInput.bind(this)}
          handleSubmit={this.submitForm.bind(this)} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
 const node = document.getElementById('appointments_data')
 const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
   <Appointments appointments={data} />,
   document.body.appendChild(document.createElement('div')),
  )
})
