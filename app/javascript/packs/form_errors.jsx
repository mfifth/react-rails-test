import React, { Component } from "react";

export class FormErrors extends Component {
  render() {
    var error_names = Object.keys(this.props.formErrors);
    var error_msgs = this.props.formErrors;
    console.log(this.props.formErrors);

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
