import React, { useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTravel } from '../../actions/profile';

const AddTravel = ({ addTravel, history }) => {
  const [ formData, setFormData ] = useState({
    destination: '',
    lodging: '',
    from: '',
    to: '',
    description: ''
  });

  const { destination, lodging, from, to, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    addTravel(formData, history)
  }

  return (
    <>
      <h1 class="large text-primary">Add A Travel Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any travel experiences that
        you've been on with friends
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => handleSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Destination"
            name="destination"
            value={destination}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Lodging"
            name="lodging"
            value={lodging}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Travel Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

AddTravel.propTypes = {
  addTravel: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTravel }
)(AddTravel);
