import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GuestRoute from './routes/GuestRoute';
import UserRoute from './routes/UserRoute';

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
      authenticated: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem('TOKEN')) this.setState({ authenticated: true });
  }

  onLogout = () => {
    this.setState({ authenticated: false });
  };
  onLogin = () => {
    this.setState({ authenticated: true });
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Fragment>
        <Route
          render={props => (
            <Navbar
              {...props}
              authenticated={authenticated}
              onLogout={this.onLogout}
            />
          )}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <GuestRoute
            path="/login"
            exact
            onLogin={this.onLogin}
            component={Login}
            authenticated={authenticated}
          />
          <GuestRoute
            path="/signup"
            exact
            component={Signup}
            authenticated={authenticated}
          />
          <UserRoute
            path="/newpoll"
            exact
            component={NewPoll}
            authenticated={authenticated}
          />

          <Navbar />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
