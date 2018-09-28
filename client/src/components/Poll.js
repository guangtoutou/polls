import React, { Component } from 'react';
import { Button, Header, Form, Radio, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import api from '../utils/api';
import formateDateTime from '../utils/Helpers';

class Poll extends Component {
  state = {
    choiceId: null,
    disabled: true,
    loading: false
  };

  onClick = () => {
    this.setState({ loading: true });
    api.polls
      .vote({
        choiceId: this.state.choiceId,
        pollId: this.props.poll._id
      })
      .then(res => {
        this.setState({ loading: false });
        this.props.onVote();
      })
      .catch(err =>
        this.setState({
          errors: { message: err.response.data },
          loading: false
        })
      );
  };

  onSelect = choiceId => {
    this.setState({ choiceId, disabled: false });
  };

  pollForm = poll => (
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
      <Button
        content="Vote"
        color="blue"
        basic
        onClick={this.onClick}
        disabled={this.state.disabled}
      />
      <span style={{ color: 'grey', marginLeft: '1em' }}>
        6 votes . 5 days left
      </span>
    </Form>
  );

  pollResult = poll => {
    const maxCount = Math.max(...poll.choices.map(choice => choice.count));
    return (
      <div>
        {poll.choices.map(choice => {
          return this.resultBar(choice, maxCount, poll.totalCount);
        })}
      </div>
    );
  };

  resultBar = (choice, maxCount, totalCount) => {
    let percentage = Math.floor((choice.count / totalCount) * 100) + '%';
    return (
      <Header
        key={choice._id}
        style={{
          position: 'relative',
          padding: '0.2em 0.5em'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            position: 'relative',
            zIndex: '99',
            color: 'rgba(0,0,0,.75)'
          }}
        >
          {percentage}
        </span>{' '}
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            zIndex: '99',
            color: 'rgba(0,0,0,.65)',
            paddingLeft: '1em'
          }}
        >
          {choice.title}
        </span>
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: percentage,
            height: '1.6em',
            borderRadius: '0.25em',
            backgroundColor: choice.count === maxCount ? '#77c7f7' : '#e1e8ed',
            zIndex: '98'
          }}
        />
      </Header>
    );
  };

  render() {
    const { poll } = this.props;
    const { loading } = this.state;
    return (
      <Segment loading={loading}>
        <Header as="h5">
          <Icon name="settings" />
          <Header.Content>
            {poll.user.username}
            <Header.Subheader style={{ display: 'inline', marginLeft: '1em' }}>
              {poll.user.email}
            </Header.Subheader>
            <Header.Subheader>
              {poll.createdAt && formateDateTime(poll.createdAt)}
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Header as="h2">{poll.question}</Header>
        {poll.voted ? this.pollResult(poll) : this.pollForm(poll)}
      </Segment>
    );
  }
}

export default withRouter(Poll);
