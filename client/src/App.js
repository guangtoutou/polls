import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Polls from './components/Polls';
import NewPoll from './components/NewPoll';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true
    };
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Fragment>
        <Route
          render={props => <Navbar {...props} authenticated={authenticated} />}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/polls" exact component={Polls} />
          <Route path="/newpoll" exact component={NewPoll} />

          <Navbar />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
