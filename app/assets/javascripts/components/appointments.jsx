const Appointments = createReactClass({
  getInitialState() {
    return {
      appointments: this.props.appointments,
      title: "Morning Meeting",
      apptTime: "Tomorrow at 9AM"
    }
  },

  handleUserInput(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  },

  submitForm(e) {
    var appointment = {title: this.state.title, appt_time: this.state.apptTime}
    $.post('/appointments', {appointment: appointment})
  },

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <AppointmentForm
          title={this.state.title}
          apptTime={this.state.apptTime}
          onUserInput={this.handleUserInput}
          handleSubmit={this.submitForm} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
})
