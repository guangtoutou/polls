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

import Poll from './Poll';
const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

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
