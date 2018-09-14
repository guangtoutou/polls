import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

UserRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default UserRoute;
