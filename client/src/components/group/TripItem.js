import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteTrip } from '../../actions/group'

const TripItem = ({
  groupId,
  auth,
  deleteTrip,
  trip: { _id, destination, lodging, from, to, description }
}) => (
  <div className="post bg-white p-1 my-1">
    {/* TODO: replace with profile of person creating trip */}
    <div>
      <Link to={`/groups/${groupId}`}>
        <img
          className="round-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt=""
        />
        <h4>{destination}</h4>
        {/* TODO: link this out to the destination */}
        <h4>Staying at {lodging}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{description}</p>
      <p className="post-date">
        Leaving on <Moment format="YYYY/MM/DD">{from}</Moment>
      </p>
      <p className="post-date">
        Returning on <Moment format="YYYY/MM/DD">{to}</Moment>
      </p>
      {!auth.loading && (
        <button onClick={e => deleteTrip(groupId, _id)} type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

TripItem.propTypes = {
  groupId: PropTypes.number.isRequired,
  trip: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeTrop: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {deleteTrip}
)(TripItem);
