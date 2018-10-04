import React from "react";
import { Link } from "react-router-dom";

export class AppHeader extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <h1 style={{ textAlign: "center" }}>React Calendar</h1>
        </Link>
      </div>
    );
  }
}
