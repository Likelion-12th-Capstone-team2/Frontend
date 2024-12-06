import styled from 'styled-components';
import { Chat } from '@/assets/icons';

const SignIn = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Log in to I WANT IT!</Title>
        <Content>
          <p>Email</p>
          <Input type="email" />
          <p>Password</p>
          <Input type="password" />
          <Button>
            <BtnIn>Sign in</BtnIn>
            <BtnIn style={{ backgroundColor: 'black' }}>Log in</BtnIn>
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

export default SignIn;

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
  ${({ theme }) => theme.font.common_input}
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
