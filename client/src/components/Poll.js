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
  Image,
  Segment,
  Grid
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Poll extends Component {
  state = {
    choiceId: null,
    loading: false
  };

  onClick = () => {
    this.setState({ loading: true });

    axios
      .post('http://localhost:8080/polls/vote', {
        choiceId: this.state.choiceId,
        pollId: this.props.poll._id
      })
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err =>
        this.setState({
          errors: { message: err.response.data },
          loading: false
        })
      );
  };

  onSelect = choiceId => {
    this.setState({ choiceId });
  };

  render() {
    const { poll } = this.props;
    const { loading } = this.state;
    return (
      <Segment loading={loading}>
        <Header as="h5">
          <Icon name="settings" />
          <Header.Content>
            Ningning Ni
            <Header.Subheader style={{ display: 'inline', marginLeft: '1em' }}>
              @guangtoutou
            </Header.Subheader>
            <Header.Subheader>
              {new Date().toLocaleString('us-EN')}
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Header>{poll.question}</Header>

        <Form>
          {poll.choices.map((choice, index) => (
            <Form.Field
              key={choice._id}
              control={Radio}
              label={choice.title}
              checked={this.state.choiceId === choice._id}
              onChange={e => this.onSelect(choice._id)}
            />
          ))}
          <Button content="Vote" color="blue" basic onClick={this.onClick} />
          <span style={{ color: 'grey', marginLeft: '1em' }}>
            6 votes . 5 days left
          </span>
        </Form>
      </Segment>
    );
  }
}

export default withRouter(Poll);
