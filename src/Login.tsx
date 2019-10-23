import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const Login: React.FC<Props> = ({ history, location, match }) => {
  return (
    <div>
      <h1>Login</h1>
      <Link to='/home'>Login</Link>
      <button onClick={() => {
        // some call
        // change to new page
        history.push('/home')
      }}>
        Click Me
      </button>
    </div>
  );
}