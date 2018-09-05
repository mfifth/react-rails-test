const AppointmentForm = (props) => (
  <div>
    <h2>Make a new Appointment</h2>
    <form onSubmit={props.handleSubmit}>
      <input
        name='title'
        placeholder='Appointment Title'
        value={props.title}
        onChange={props.onUserInput} />
      <input
        name='apptTime'
        placeholder="Appointment Time"
        value={props.apptTime}
        onChange={props.onUserInput} />
      <input type='submit' value='Make Appointment' />
    </form>
  </div>
)
