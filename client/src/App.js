import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import GuestRoute from './routes/GuestRoute';
import UserRoute from './routes/UserRoute';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Polls from './components/Polls';
import NewPoll from './components/NewPoll';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: null,
      email: null
    };
  }

  componentDidlMount() {
    let token = localStorage.getItem('TOKEN');
    if (token) {
      setAuthorizationHeader(token);
      const user = jwt.decode(token);
      this.setState({
        email: user.email,
        username: user.username,
        authenticated: true
      });
    }
  }

  onLogout = () => {
    this.setState({ authenticated: false });
    setAuthorizationHeader();
  };

  onLogin = token => {
    this.setState({ authenticated: true });
    setAuthorizationHeader(token);
    const user = jwt.decode(token);
    this.setState({
      email: user.email,
      username: user.username,
      authenticated: true
    });
    this.props.history.push('/');
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
