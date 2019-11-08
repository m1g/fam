import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addGroup } from '../../actions/group'

const GroupForm = ({ addGroup }) => {
  const [name, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addGroup({ name });
    setText('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <textarea
          name="name"
          cols="30"
          rows="5"
          placeholder="Create a group"
          value={name}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

GroupForm.propTypes = {
  addGroup: PropTypes.func.isRequired
}

export default connect(null, { addGroup })(GroupForm)
