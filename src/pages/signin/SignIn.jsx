import styled from 'styled-components';

const SignIn = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Log in to I WANT IT!</Title>
        <Content>
          <p>Email</p>
          <p>Password</p>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default SignIn;

const Container = styled.div`
  width: 41rem;
  border: 1px solid black;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.common_detail_eng}
  display: flex;
  justify-content: center;
  padding: 1.56rem 0;
  background-color: black;
`;

const Content = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem;
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
