import React from 'react';
import styled from 'styled-components';

const AuthLayout = ({ title, children }) => (
  <Wrapper>
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  </Wrapper>
);

export default AuthLayout;

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
