import React from 'react';
import styled from 'styled-components';

const AuthInput = React.forwardRef(
  ({ label, isValid = true, errorText, ...props }, ref) => (
    <div>
      <p>{label}</p>
      <Input ref={ref} $isValid={isValid} {...props} />
      {!isValid && errorText && <ErrorText>{errorText}</ErrorText>}
    </div>
  ),
);

export default AuthInput;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  margin: 0.62rem 0 1rem;
  ${({ theme }) => theme.font.common_input};
  border: 1px solid black;

  &:focus {
    border: none;
    outline: 2px solid ${(props) => (props.$isValid ? '#87dbe9' : '#ff5a5a')};
  }
`;

const ErrorText = styled.p`
  color: #ff5a5a;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;
