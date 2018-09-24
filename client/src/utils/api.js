import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default {
  user: {
    login: credentials => axios.post('/login', credentials),
    signup: userForm => axios.post('/signup', userForm),
    confirm: token =>
      axios.get('/confirm', { params: { token: token } }).then(res => res.data),
    forgetPassword: data =>
      axios.post('/forget_password', data).then(res => res.data),
    validateToken: token =>
      axios.post('/validate_token', token).then(res => res.data),
    resetPassword: data =>
      axios.post('/reset_password', data).then(res => res.data)
  },

  polls: {
    vote: data => axios.post('/polls/vote', data),
    getPolls: () => axios.get('/polls'),
    newPoll: data => axios.post('/polls', data)
  }
};
