import axios from '../../service/http/axios';

export default {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
};
