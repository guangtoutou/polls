import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react';

import Poll from './Poll';
import api from '../utils/api';
const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

export default class Polls extends Component {
  state = { data: [] };

  componentDidMount() {
    api.polls
      .getPolls()
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
      <Grid
        textAlign="center"
        style={{ height: '100%', padding: '2em', marginTop: '2em' }}
      >
        <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
          {polls.map(poll => (
            <Poll key={poll._id} poll={poll} />
          ))}
        </Grid.Column>
      </Grid>
    );
  }
}
