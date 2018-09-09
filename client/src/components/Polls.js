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

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

export default class Polls extends Component {
  render() {
    return (
      <Grid textAlign="center" style={{ height: '100%', padding: '2em' }}>
        <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
          <Segment>
            <Header as="h5">
              <Icon name="settings" />
              <Header.Content>
                Ningning Ni
                <Header.Subheader
                  style={{ display: 'inline', marginLeft: '1em' }}
                >
                  @guangtoutou
                </Header.Subheader>
                <Header.Subheader>
                  {new Date().toLocaleString('us-EN')}
                </Header.Subheader>
              </Header.Content>
            </Header>

            <Header>Is it Raining outside?</Header>

            <Form>
              <Form.Field>
                <Form.Field control={Radio} label="One" value="1" />
                <Form.Field control={Radio} label="Two" value="2" />
                <Form.Field control={Radio} label="Three" value="3" />
              </Form.Field>
              <Button content="Vote" color="blue" basic />
              <span style={{ color: 'grey', marginLeft: '1em' }}>
                6 votes . 5 days left
              </span>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
