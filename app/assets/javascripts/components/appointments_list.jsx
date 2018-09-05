const AppointmentsList = createReactClass({
  render: function() {
    return (
      <div>
        {this.props.appointments.map(function(appointment, i){
          return (
            <Appointment key={`appointment-${i}`} appointment={appointment} />
          )
        })}
      </div>
    )
  }
})
