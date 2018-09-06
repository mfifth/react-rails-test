import React, { Component } from "react";

export class FormErrors extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.formErrors).map(error_name => {
          return this.props.formErrors[error_name].map(error => {
            return (
              <p>
                {error_name} {error}
              </p>
            );
          });
        })}
      </div>
    );
  }
}
