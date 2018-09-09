import React, { Component } from 'react';
import {
  Button,
  Menu,
  Container,
  Visibility,
  Header,
  Form,
  Radio,
  Icon,
  Item,
  Input,
  Select,
  TextArea,
  Checkbox,
  Image,
  Segment,
  Grid,
  Dropdown
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const days = Array.from(Array(24).keys()).map(day => ({
  key: day,
  text: day,
  value: day
}));

const hours = Array.from(Array(24).keys()).map(hour => ({
  key: hour,
  text: hour,
  value: hour
}));
export default class NewPoll extends Component {
  state = { disabled: true, loading: false };

  render() {
    const { disabled, loading, value } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100%', padding: '2em' }}>
        <Grid.Column style={{ maxWidth: 500 }} textAlign="left">
          <Form>
            <Header>Create Poll</Header>
            <Form.Field control={TextArea} placeholder="Enter your question" />
            <Form.Field control={Input} placeholder="Choice 1" />
            <Form.Field control={Input} placeholder="Choice 2" />
            <Form.Button
              icon="plus"
              content="Add a choice"
              basic
              style={{ border: 'dashed 1px grey', boxShadow: 'none' }}
            />
            <Form.Group inline>
              <span style={{ margin: '0 1em 0 0' }}>Poll Length:</span>
              <Form.Field
                control={Select}
                options={days}
                compact
                defaultValue={1}
              />
              <span style={{ margin: '0 1em 0 0' }}>Days</span>
              <Form.Field
                control={Select}
                options={hours}
                compact
                defaultValue={0}
              />
              <span style={{ margin: '0 1em 0 0' }}>Hours</span>
            </Form.Group>
            <Button color="blue" fluid size="large" disabled={disabled}>
              Create Poll
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
