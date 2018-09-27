import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import GuestRoute from './routes/GuestRoute';
import UserRoute from './routes/UserRoute';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NewPoll from './components/NewPoll';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

class App extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem('TOKEN');
    if (token) {
      setAuthorizationHeader(token);

      const user = jwt.decode(token);
      this.state = {
        ...user,
        authenticated: true
      };
    } else {
      this.state = {
        authenticated: false,
        username: '',
        email: ''
      };
    }
  }

  componentDidMount() {}

  onLogout = () => {
    this.setState({ authenticated: false });
    setAuthorizationHeader();
    this.props.history.push('/login');
  };

  onLogin = token => {
    this.setState({ authenticated: true });
    localStorage.setItem('TOKEN', token);
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
          <UserRoute
            path="/"
            exact
            component={Home}
            authenticated={authenticated}
          />
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
            onSignup={this.onLogin}
            component={Signup}
            authenticated={authenticated}
          />
          <UserRoute
            path="/newpoll"
            exact
            component={NewPoll}
            authenticated={authenticated}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
