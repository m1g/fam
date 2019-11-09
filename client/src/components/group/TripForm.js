import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrip } from '../../actions/group';

const TripForm = ({ tripId, addTrip }) => {
  const [ formData, setFormData ] = useState({
    destination: '',
    lodging: '',
    from: '',
    to: '',
    description: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    addTrip(tripId, { formData });
    setFormData({
      destination: '',
      lodging: '',
      from: '',
      to: '',
      description: ''
    });
  }


  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create a trip</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <input
          name="destination"
          placeholder="Where we going?"
          value={formData.destination}
          onChange={e => handleChange(e)}
        ></input>
        <input type="submit" className="btn btn-dark my-1" value="Create Trip" />
      </form>
    </div>
  );
};

TripForm.propTypes = {
  addTrip: PropTypes.func.isRequired
};

export default connect(null, {addTrip})(TripForm);
