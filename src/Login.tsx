import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Input as InputComponent,
  Submit
} from './components/shared/form-components';
import { Title, Wrapper, Input, Button } from './styles';
import { LoginForm } from './components/LoginForm';
import ky from 'ky';

interface Props extends RouteComponentProps {}

interface Data {
  username: string;
  password: string;
}

export const Login: React.FC<Props> = ({ history, match }) => {
  const userId = 12345;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async (e: any) => {
    e.preventDefault();
    const data: Data = { username, password };

    if (isValidLogin) {
      history.push(`/home/${userId}`);
    }
  };

  const isValidLogin = () => {
    //TODO: lookup express validation
    return true;
  };

  return (
    <>
      <Wrapper>
        <Title>Login</Title>
        <LoginForm onSubmit={handleLoginClick}>
          <Input
            as={InputComponent}
            placeholder="Username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            as={InputComponent}
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Submit name="submit" label="Login" type="submit" value="Login" />
          <Button type="button">Create an Account</Button>
        </LoginForm>
      </Wrapper>
    </>
  );
};
