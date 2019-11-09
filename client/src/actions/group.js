import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GROUPS,
  GET_GROUP,
  GROUP_ERROR,
  DELETE_GROUP,
  ADD_GROUP,
  ADD_TRIP,
  REMOVE_TRIP
} from './types';

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

// Get group
export const getGroup = id => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete group
export const deleteGroup = id => async dispatch => {
  try {
    await axios.delete(`/api/groups/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id
    });

    dispatch(setAlert('Group removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add group
export const addGroup = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/groups', formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group created', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add trip
export const addTrip = (groupId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/groups/trips/${groupId}`, formData, config);

    dispatch({
      type: ADD_TRIP,
      payload: res.data
    });

    dispatch(setAlert('Trip added', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete trip
export const deleteTrip = (groupId, tripId) => async dispatch => {

  try {
    await axios.delete(`/api/groups/trips/${groupId}/${tripId}`);

    dispatch({
      type: REMOVE_TRIP,
      payload: tripId
    });

    dispatch(setAlert('Trip removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
