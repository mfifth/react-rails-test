import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appointments from "./Appointments";
import Appointment from "./Appointment";
import { AppHeader } from "./AppHeader";
import AppointmentForm from "./AppointmentForm";
import { UserForm } from "./UserForm";
import {
  createUser,
  loginUser,
  setupAuthToken,
  logoutUser,
  getAppointments
} from "./UserLogic";

class AppRouter extends React.Component {
  state = {
    token: null,
    newUser: true,
    loginErrors: {}
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({ token: token });
    }
  }

  handleUser(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const api_response = this.state.newUser
      ? createUser(data)
      : loginUser(data);

    api_response
      .success(response => {
        setupAuthToken(response.jwt);
        localStorage.setItem("token", response.jwt);

        this.setState({
          token: response.jwt,
          loginErrors: response.error
        });
      })
      .error(error => {
        this.setState({ loginErrors: error });
      });
  }

  toggleState(e) {
    let userState = this.state.newUser;
    this.setState({ newUser: !userState });
  }

  logoutUser(e) {
    localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    this.setState({ token: null });
    console.log(this.state);
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.token ? (
          <div>
            <Route
              path="/"
              render={() => (
                <AppHeader handleLogout={this.logoutUser.bind(this)} />
              )}
            />
            <Route exact path="/" component={Appointments} />
            <Route exact path="/appointments/:id" component={Appointment} />
            <Route path="/appointments/:id/edit" component={AppointmentForm} />
          </div>
        ) : (
          <UserForm
            submitForm={this.handleUser.bind(this)}
            newUser={this.state.newUser}
            toggleUserState={this.toggleState.bind(this)}
          />
        )}
      </BrowserRouter>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <AppRouter />,
    document.body.appendChild(document.createElement("div"))
  );
});
