import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrip } from '../../actions/group';

const TripForm = ({ groupId, addTrip }) => {
  const [formData, setFormData] = useState({
    destination: '',
    lodging: '',
    from: '',
    to: '',
    description: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTrip(groupId, formData);
    setFormData({
      destination: '',
      lodging: '',
      from: '',
      to: '',
      description: ''
    });
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add a trip</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <h4>Destination</h4>
          <input
            type="text"
            name="destination"
            placeholder="Where are we going?"
            value={formData.destination}
            onChange={e => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <h4>Lodging</h4>
          <input
            type="text"
            name="lodging"
            placeholder="Where are we staying?"
            value={formData.lodging}
            onChange={e => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Description</h4>
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="What's the purpose of the trip?"
            value={formData.description}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-dark my-1"
          value="Create Trip"
        />
      </form>
    </div>
  );
};

TripForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired
};

export default connect(
  null,
  { addTrip }
)(TripForm);
