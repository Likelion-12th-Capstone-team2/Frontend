import React from 'react';
import styled from 'styled-components';

const AuthLayout = ({ title, activeTitle, onTitleClick, children }) => (
  <Wrapper>
    <Container>
      <TitleBox>
        {Array.isArray(title) ? (
          title.map((t) => (
            <Title
              key={t}
              $isActive={activeTitle === t}
              onClick={() => onTitleClick(t)}
              $width={`${100 / title.length}%`}
            >
              {t}
            </Title>
          ))
        ) : (
          <Title>{title}</Title>
        )}
      </TitleBox>
      <Content>{children}</Content>
    </Container>
  </Wrapper>
);

export default AuthLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

  ${({ theme }) => theme.mobile} {
    width: 90%;
    margin: 7.5rem auto 5rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.common_detail_eng};
  width: ${(props) => props.$width || '100%'};
  text-align: center;
  cursor: pointer;
  padding: 1.56rem 0;
  ${(props) =>
    Array.isArray(props.$titles)
      ? `
    color: ${props.$active ? 'white' : 'black'};
    background-color: ${props.$active ? 'black' : '#168395'};
  `
      : `
    color: white;
    background-color: black;
  `}
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.color.mint};
  padding: 2.63rem 2.38rem;
`;
