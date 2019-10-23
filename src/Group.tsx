import React from 'react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<{ groupId: string}> {}

export const Group: React.FC<Props> = ({ match }) => {
  console.log(match)
  // TODO: Fetch Group By Group Id
  // React.useEffect(() => {
  //   fetch(`someapi.example.com/group/${match.params.groupId}`)
  // }, [match.params.groupId])

  return (
    <div>
      Showing Group info for group #{match.params.groupId}
    </div>
  );
}