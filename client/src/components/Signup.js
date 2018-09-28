import React, { Component } from 'react';
import { Grid, Form, Button, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Validator from 'validator';

import InlineError from '../messages/InlineError';
import api from '../utils/api';

export default class Signup extends Component {
  state = {
    data: {
      fullname: '',
      username: '',
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      api.user
        .signup(this.state.data)
        .then(res => {
          this.props.onSignup(res.data.token);
          this.setState({ loading: false });
        })
        .catch(err =>
          this.setState({
            errors: { message: err.response.data },
            loading: false
          })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (Validator.isEmpty(data.fullname))
      errors.fullname = "Full name can't be empty";
    if (Validator.isEmpty(data.username))
      errors.username = "Username can't be empty";
    if (Validator.isEmpty(data.password))
      errors.password = "Password can't be empty";
    if (!Validator.isEmail(data.email))
      errors.email = 'please use a valid email address';

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Grid
        centered
        style={{ height: '100%', padding: '2em', marginTop: '2em' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: '450px' }}>
          <Header as="h2" color="blue" textAlign="center">
            Signup
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading}>
            {errors.message && (
              <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.message}</p>
              </Message>
            )}
            <Form.Field error={!!errors.fullname}>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="James"
                value={data.fullname}
                onChange={this.onChange}
              />
              {errors.fullname && <InlineError text={errors.fullname} />}
            </Form.Field>
            <Form.Field error={!!errors.username}>
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="James"
                value={data.username}
                onChange={this.onChange}
              />
              {errors.username && <InlineError text={errors.username} />}
            </Form.Field>
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="James"
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Make it secure"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Button color="blue" fluid size="large">
              Signup
            </Button>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
