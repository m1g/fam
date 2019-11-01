import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTravel } from '../../actions/profile'

const Travel = ({ experience, deleteTravel }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.destination}</td>
      <td className="hide-sm">{exp.lodging}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
      </td>
      <td>
        <button onClick={() => deleteTravel(exp._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Travel experiences</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Destination</th>
            <th className="hide-sm">Lodging</th>
            <th className="hide-sm">Dates</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  )
}

Travel.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteTravel: PropTypes.func.isRequired
}

export default connect(null, { deleteTravel })(Travel)