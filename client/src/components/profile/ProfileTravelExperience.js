import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileTravelExperience = ({
  experience: { destination, lodging, from, to, description }
}) => (
  <div>
    <h3 className="text-dark">{destination}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
      <Moment format="YYYY/MM/DD">{to}</Moment>
    </p>
    <p>
      <strong>Lodging: </strong> {lodging}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileTravelExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileTravelExperience;
