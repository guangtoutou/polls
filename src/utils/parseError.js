import _ from 'lodash';

export default function(errorMessage) {
  return {
    confirmation: 'fail',
    message: errorMessage
  };
}
