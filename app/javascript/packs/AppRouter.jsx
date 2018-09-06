import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appointments from "./Appointments";
import Appointment from "./Appointment";
import { AppHeader } from "./AppHeader";

export default props => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={AppHeader} />
        <Route
          exact
          path="/"
          render={routeProps => (
            <Appointments {...routeProps} appointments={props.appointments} />
          )}
        />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route exact path="/" component={AppHeader} />
      </div>
    </BrowserRouter>
  );
};
