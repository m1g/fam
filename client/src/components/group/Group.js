import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import GroupItem from  '../groups/GroupItem';
import { getGroup } from '../../actions/group'

const Group = ({ getGroup, group: { group, loading }, match }) => {
  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);

  return loading || group === null ? (<Spinner />) : (<>
    <Link to='/groups' className='btn'>
      Back To Groups
    </Link>
    <GroupItem group={group} showActions={false} />
  </>);
};

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
})

export default connect(mapStateToProps, { getGroup })(Group);
