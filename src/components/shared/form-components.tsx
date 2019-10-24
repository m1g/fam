import React from 'react';
import { InputContainer, FormButton } from '../../styles';

interface Common {
  placeholder?: string
  label?: string
  type: string
  value: string
  name: string
}

interface SubmitProps extends Common {}
interface InputProps extends Common {
  onChange: any;
  stacked?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <InputContainer>
      {props.label}
      <input {...props} />
    </InputContainer>
  );
}

export const Submit: React.FC<SubmitProps> = (props) => {
  return (
    <FormButton primary {...props} />
  );
}