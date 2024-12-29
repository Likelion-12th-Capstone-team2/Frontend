import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AuthLayout from './components/AuthLayout';
import AuthInput from './components/AuthInput';
import Onboarding from './components/Onboarding';
import { useAuth } from '@/hooks/useAuth';

const SignUp = () => {
  useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const location = useLocation();
  const [step, setStep] = useState(location.state?.step || 'signup');
  const [emailError, setEmailError] = useState(
    'Please fill out the correct email format',
  );
  const emailRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    const emailIsValid = validateEmail(email);
    setIsEmailValid(emailIsValid);
    const passwordsMatch = password === passwordCheck;
    setIsPasswordMatch(passwordsMatch);

    if (!emailIsValid) {
      setEmailError('Please fill out the correct email format');
      emailRef.current?.focus();
      return;
    }

    if (!passwordsMatch) {
      passwordCheckRef.current?.focus();
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/accounts/signup/`,
        {
          email,
          password,
        },
      );
      localStorage.setItem('username', response.data.data.username);
      localStorage.setItem('token', response.data.data.access_token);
      localStorage.setItem('id', response.data.data.id);
      setStep('onboarding');
    } catch (error) {
      if (error.response?.status === 401) {
        setIsEmailValid(false);
        setEmailError('An account with this email already exists');
        emailRef.current?.focus();
      }
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <AuthLayout title="Sign up to I WANT IT!">
      {step === 'signup' ? (
        <>
          <AuthInput
            ref={emailRef}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isEmailValid}
            errorText={emailError}
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthInput
            ref={passwordCheckRef}
            label="Check the Password"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            isValid={isPasswordMatch}
            errorText="Password does not match"
          />
          <Button>
            <BtnIn onClick={handleSignUp}>Sign up</BtnIn>
          </Button>{' '}
        </>
      ) : (
        <Onboarding />
      )}
    </AuthLayout>
  );
};

export default SignUp;

const Button = styled.div`
  display: flex;
  width: fit-content;
  margin: 0.5rem auto;
  gap: 0.88rem;
`;

const BtnIn = styled.button`
  all: unset;
  cursor: pointer;
  ${({ theme }) => theme.font.m_btn}
  color: white;
  background-color: ${({ theme }) => theme.color.orange};
  padding: 0.25rem 0.75rem;
`;
