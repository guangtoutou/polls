import React, { Component } from 'react';
import { Menu, Container, Visibility } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Polls from './Polls';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Polls />
      </div>
    );
  }
}
