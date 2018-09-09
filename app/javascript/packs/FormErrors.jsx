import React, { Component } from "react";

export const FormErrors = props => {
  return (
    <div>
      {Object.keys(props.formErrors).map(error_name => {
        return props.formErrors[error_name].map(error => {
          return (
            <p>
              {error_name} {error}
            </p>
          );
        });
      })}
    </div>
  );
};
