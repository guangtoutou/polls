import React, { Component } from 'react';
import { Input, Grid, Form, Button, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Validator from 'validator';

import InlineError from '../messages/InlineError';
import api from '../utils/api';

export default class Login extends Component {
  state = {
    data: {
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
      console.log(this.state);

      api.user
        .login(this.state.data)
        .then(res => {
          this.props.onLogin(res.data.token);
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
    if (Validator.isEmpty(data.username))
      errors.username = "Username can't be empty";
    if (Validator.isEmpty(data.password))
      errors.password = "Password can't be empty";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: '100%', padding: '2em', marginTop: '2em' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: '450px' }} textAlign="left">
          <Header as="h2" color="blue" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.message && (
              <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.message}</p>
              </Message>
            )}{' '}
            <Form.Field error={!!errors.username}>
              <Input
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="User name"
                value={data.username}
                onChange={this.onChange}
              />
              {errors.username && <InlineError text={errors.username} />}
            </Form.Field>
            <Form.Field error={!!errors.password}>
              <Input
                fluid
                icon="lock"
                name="password"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
