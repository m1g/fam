import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

interface Props extends RouteComponentProps<{ groupId: string}> {}

export const Home: React.FC<Props> = ({ match }) => {
  // TODO: Fetch Groups By User Id
  // React.useEffect(() => {
  //   fetch(`someapi.example.com/groups/${match.params.userId}`)
  // }, [match.params.userId])

  const groupId = 2

  return (
    <div>
      <h1>Home</h1>
      <Link to={`/group/${groupId}`}>GroupName</Link>
    </div>
  );
}