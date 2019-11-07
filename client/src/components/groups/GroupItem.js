import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const GroupItem = ({
  auth,
  group: { _id, name, image, trips, owner, members }
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/post/${_id}`}>
        <img
          className="round-img"
          src={ image ? image
              : '//www.gravatar.com/avatar/59506ba9489e7751f647befabb486995?s=200&r=pg&d=mm'
          }
          alt=""
        />
        <Link to={`/post/${_id}`}>
          <h4>{name}</h4>
        </Link>
      </Link>
    </div>
    <div>
      {members.length > 0 &&
        members.map(member => (
          <button type="button" className="btn btn-light">
            {member}
          </button>
        ))}
      <button className="btn btn-primary">
        Trips Planned{' '}
        {trips.length > 0 && (
          <span className="comment-count">{trips.length}</span>
        )}
      </button>
      {!auth.loading && owner === auth.user._id && (
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(GroupItem);
