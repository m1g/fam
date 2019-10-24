import React from 'react';
import { Form } from '../styles';

interface Props {
  onSubmit: any;
}

export const LoginForm: React.FC<Props> = (props) => {
  return (
    <Form {...props}>{props.children}</Form>
  );
}