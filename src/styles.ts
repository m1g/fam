import styled, { css } from 'styled-components';

interface BtnProps {
  children?: any
  primary?: boolean
}

interface InputContainerProps {
  stacked?: boolean
}

interface InputProps {
  width?: number;
}

export const Wrapper = styled.div`
  height: 100vh;
`;
export const Title = styled.h1`
  font-size: 1.53em;
  text-align: center;
  color: palevioletred;

  ${(props: any) => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;
export const Button = styled.button<BtnProps>`
  background: ${(props: any)  => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props: any)  => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  cursor: pointer;
  user-select: none;
  padding: 0.8em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// FORM ELEMENTS

export const Form = styled.form`
  width: 70%;
  height: 14rem;
  padding: 2em;
  max-width: 25rem;
  margin: 0 auto;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between
  background: hsl(37, 100%, 92%, 0.3);
`;
export const InputContainer = styled.div<InputContainerProps>`
  display: flex;

  flex-direction: ${(props: any) =>  (props.stacked ? 'column' : 'row')}
`;
export const Input = styled.input<InputProps>`
  padding: 0.8em 1em;
  line-height: 1.5;
  font-size: 0.85em;
  border: 1px solid #ccc;
  border-radius: 0.15em;

  width: ${(props: any) => (props.width ? props.width : '100%')};
`;
export const FormButton = styled.input<BtnProps>`
  background: ${(props: any)  => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props: any)  => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  cursor: pointer;
  user-select: none;
  padding: 0.8em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;