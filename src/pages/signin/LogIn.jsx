import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Chat } from '@/assets/icons';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    const emailIsValid = validateEmail(email);
    setIsEmailValid(emailIsValid);
    setIsPasswordValid(true);
    console.log(email);
    console.log(password);

    if (!emailIsValid) {
      emailRef.current?.focus();
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/accounts/login/`,
        { email, password },
      );

      localStorage.setItem('username', response.data.data.username);
      localStorage.setItem('token', response.data.data.access_token);
      navigate('/home');
    } catch (error) {
      setIsPasswordValid(false);
      passwordRef.current?.focus();
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Log in to I WANT IT!</Title>
        <Content>
          <p>Email</p>
          <Input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $isValid={isEmailValid}
          />
          {!isEmailValid && (
            <ErrorText>Please fill out the correct email format</ErrorText>
          )}
          <p>Password</p>
          <Input
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            $isValid={isPasswordValid}
          />
          {!isPasswordValid && (
            <ErrorText>Please fill out a valid password.</ErrorText>
          )}
          <Button>
            <BtnIn>Sign in</BtnIn>
            <BtnIn style={{ backgroundColor: 'black' }} onClick={handleLogin}>
              Log in
            </BtnIn>
          </Button>
          <BtnKakao>
            <Chat />
            <KakaoP>Log in with Kakao</KakaoP>
          </BtnKakao>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default LogIn;

const Container = styled.div`
  width: 41rem;
  border: 1px solid black;
  margin: 7.5rem 2.5rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.common_detail_eng}
  display: flex;
  justify-content: center;
  padding: 1.56rem 0;
  background-color: black;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.color.mint};
  padding: 2.63rem 2.38rem;
`;

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

const BtnKakao = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid black;
  background: linear-gradient(90deg, #87dbe9 0%, #fff 125.31%);
`;

const KakaoP = styled.p`
  ${({ theme }) => theme.font.common_input};
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.mint};
  background-image: linear-gradient(
      45deg,
      ${({ theme }) => theme.color.orange} 25%,
      transparent 25%,
      transparent 75%,
      ${({ theme }) => theme.color.orange} 75%
    ),
    linear-gradient(
      45deg,
      ${({ theme }) => theme.color.orange} 25%,
      transparent 25%,
      transparent 75%,
      ${({ theme }) => theme.color.orange} 75%
    );
  background-size: 10rem 10rem;
  background-position:
    0 0,
    5rem 5rem;
`;
