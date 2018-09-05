import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { AppointmentForm } from './appointment_form'
import { AppointmentsList } from './appointments_list'

class Appointments extends Component {
	state = {
    appointments: this.props.appointments,
    title: "Morning Meeting",
    apptTime: "Tomorrow at 9AM"
	}

  handleUserInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addNewAppointment(appointment) {
    this.setState({
      appointments: [...this.state.appointments, appointment]
    });
  }

  submitForm(e) {
    e.preventDefault();

    const appointment = { title: this.state.title, appt_time: this.state.apptTime }
    $.post('/appointments', { appointment }).done((data) => this.addNewAppointment(data));
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
