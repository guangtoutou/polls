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
import { Link } from 'react-router-dom';
import axios from 'axios';

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

const Poll = ({ poll }) => (
  <Segment>
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
      <Form.Field>
        {poll.choices.map((choice, index) => (
          <Form.Field key={index} control={Radio} label={choice} />
        ))}
      </Form.Field>
      <Button content="Vote" color="blue" basic />
      <span style={{ color: 'grey', marginLeft: '1em' }}>
        6 votes . 5 days left
      </span>
    </Form>
  </Segment>
);

export default class Polls extends Component {
  state = { data: [] };

  componentDidMount() {
    axios
      .get('http://localhost:8080/polls')
      .then(res => {
        this.setState({ data: res.data.polls });
      })
      .catch(err =>
        this.setState({
          errors: { message: err.response.data },
          loading: false
        })
      );
  }

  render() {
    const polls = this.state.data;
    return (
      <Grid textAlign="center" style={{ height: '100%', padding: '2em' }}>
        <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
          {polls.map(poll => (
            <Poll key={poll._id} poll={poll} />
          ))}
        </Grid.Column>
      </Grid>
    );
  }
}
