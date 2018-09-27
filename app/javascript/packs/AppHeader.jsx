import React from "react";
import { Link } from "react-router-dom";

export class AppHeader extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <h1>CalReact</h1>
        </Link>

        <button className="logout-btn" onClick={this.props.handleLogout}>
          Click here to logout
        </button>
      </div>
    );
  }
}
