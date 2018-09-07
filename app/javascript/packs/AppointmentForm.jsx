import React from "react";
import DateTime from "react-datetime";

export const AppointmentForm = props => (
  <div>
    <h2>Make a new Appointment</h2>
    <form onSubmit={props.handleSubmit}>
      <input
        name="title"
        placeholder="Appointment Title"
        value={props.title}
        onChange={props.onUserInput}
      />
      <DateTime
        input={false}
        open={true}
        name="appt_time"
        value={props.appt_time}
        onChange={props.onUserInput}
      />
      <input
        type="submit"
        value="Make Appointment"
        disabled={!props.formValid}
      />
    </form>
  </div>
);
