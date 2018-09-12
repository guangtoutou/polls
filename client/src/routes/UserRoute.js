import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

UserRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default UserRoute;
