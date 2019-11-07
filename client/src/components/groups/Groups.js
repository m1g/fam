import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGroups } from '../../actions/group';
import Spinner from '../layout/Spinner'
import GroupItem from './GroupItem'

const Groups = ({ getGroups, group: { groups, loading}}) => {
  useEffect(() => {
    getGroups();
  }, [getGroups])

  return loading ? <Spinner /> : (
    <>
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to your groups
      </p>
      <div className="posts">
        {groups.map(group => (
          <GroupItem key={group._id} group={group} />
        ))}
      </div>
    </>
  )
}

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  group: state.group
})

export default connect(mapStateToProps, {getGroups})(Groups);