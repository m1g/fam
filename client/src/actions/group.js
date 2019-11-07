import axios from 'axios';
import { setAlert } from './alert';
import { GET_GROUPS, GROUP_ERROR } from './types';

// Get groups
export const getGroups = () => async dispatch => {
  try {
    const res = await axios.get('/api/groups');

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
