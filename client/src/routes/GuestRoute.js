import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} {...rest} />
          )
        }
      />
    </div>
  );
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default GuestRoute;
