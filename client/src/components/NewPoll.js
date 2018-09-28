import React, { Component } from 'react';
import {
  Button,
  Header,
  Form,
  Input,
  Select,
  TextArea,
  Grid
} from 'semantic-ui-react';
import Validator from 'validator';
import api from '../utils/api';

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
  state = {
    disabled: true,
    loading: false,
    data: {
      question: '',
      choices: [{ title: '' }, { title: '' }],
      days: 0,
      hours: 0
    }
  };

  onChange = e => {
    let newState = { ...this.state.data, [e.target.name]: e.target.value };
    let hasEmptyField = this.hasEmptyField(newState);

    this.setState({
      data: newState,
      disabled: hasEmptyField
    });
  };

  onChangeChoice = (index, e) => {
    let { choices } = this.state.data;
    choices[index].title = e.target.value;
    let newState = { ...this.state.data, choices };
    let hasEmptyField = this.hasEmptyField(newState);

    this.setState({
      data: newState,
      disabled: hasEmptyField
    });
  };

  onSubmit = () => {
    this.setState({ loading: true });

    api.polls
      .newPoll({
        ...this.state.data,
        expiredAt: new Date()
      })
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err =>
        this.setState({
          errors: { message: err.response.data },
          loading: false
        })
      );
  };

  hasEmptyField = newState => {
    let hasEmptyChoices = newState.choices
      .map(choice => Validator.isEmpty(choice.title))
      .reduce((acc, cur) => acc || cur);
    if (!Validator.isEmpty(newState.question) && !hasEmptyChoices) return false;

    return true;
  };

  addChoice = () => {
    let { choices } = this.state.data;
    choices.push({ title: '' });
    this.setState({
      data: { ...this.state.data, choices }
    });
  };

  render() {
    const { disabled, loading, data } = this.state;
    console.log(data);

    return (
      <Grid textAlign="center" style={{ height: '100%', marginTop: '2em' }}>
        <Grid.Column style={{ maxWidth: '450px' }} textAlign="left">
          <Form loading={loading}>
            <Header>Create Poll</Header>
            <Form.Field
              control={TextArea}
              placeholder="Enter your question"
              icon="user"
              name="question"
              value={data.question}
              onChange={this.onChange}
            />
            {data.choices.map((option, index) => (
              <Form.Field
                control={Input}
                placeholder={option.title}
                key={index}
                name={index}
                value={option.title}
                onChange={e => this.onChangeChoice(index, e)}
              />
            ))}
            <Form.Button
              icon="plus"
              content="Add a choice"
              basic
              style={{ border: 'dashed 1px grey', boxShadow: 'none' }}
              onClick={this.addChoice}
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
            <Button
              color="blue"
              fluid
              size="large"
              disabled={disabled}
              onClick={this.onSubmit}
            >
              Create Poll
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
