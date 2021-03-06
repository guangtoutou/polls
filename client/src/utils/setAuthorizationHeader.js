import axios from 'axios';

const setAuthorizationHeader = token => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationHeader;
