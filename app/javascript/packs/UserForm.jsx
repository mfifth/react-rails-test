import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const UserForm = props => {
  return (
    <Form onSubmit={props.submitForm} className="form-gutter">
      <h6>Please sign in to use the Calendar</h6>

      <FormGroup>
        <h6 style={{ color: "red" }}>{props.loginErrors}</h6>
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>

        <Input type="password" name="password" id="examplePassword" />

        {props.newUser && (
          <FormGroup style={{ marginTop: "1rem" }}>
            <Label for="examplePassword">Password Confirmation</Label>
            <Input type="password" name="password_confirmation" />
          </FormGroup>
        )}

        <Input type="submit" className="login-btn" />
      </FormGroup>

      <FormGroup>
        <Button onClick={props.toggleUserState}>
          {props.newUser ? "Click here to sign in" : "Click here to sign up"}
        </Button>
      </FormGroup>
    </Form>
  );
};
