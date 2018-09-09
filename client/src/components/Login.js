import React, { Component } from 'react';
import {
  Input,
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Image,
  Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

export default class Login extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%', padding: '2em' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

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
