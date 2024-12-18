import styled from 'styled-components';
import backgroundEg from '@/assets/backgroundEg.png';

const SignIn = () => {
  return (
    <Wrapper>
      <Container>
        <Line position="top" />
        <Line position="bottom" />
        <Line position="left" />
        <Line position="right" />
      </Container>
      <NavContainer>
        <NavBtn>Ding!</NavBtn>
        <NavBtn>Setting</NavBtn>
        <NavBtn>Log out</NavBtn>
      </NavContainer>
      <TitleContainer>
        <TitleWrapper>
          <Title>gggggggg's</Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title>WISH LIST</Title>
        </TitleWrapper>
      </TitleContainer>
      <PriceWrapper>
        <Price>~30,000</Price>
        <Price>30,000~50,000</Price>
        <Price>50,000~100,000</Price>
        <Price>100,000~</Price>
      </PriceWrapper>
      <ClickWish>Click Here and Categorize Your WISH</ClickWish>
    </Wrapper>
  );
};

export default SignIn;

const ClickWish = styled.p`
  ${({ theme }) => theme.font.p_clickwish_eng}
  background-color: white;
  color: #000;
  width: 33.3rem;
  margin-left: 11rem;
  margin-top: 1.35rem;
`;

const Price = styled.div`
  ${({ theme }) => theme.font.p_numBtn}
  border-radius: 3.125rem;
  border: 1px solid #000;
  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
  background-color: black;
  border-color: white;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  margin-right: 0.8rem;
  margin-top: 1rem;
  &:hover {
    background-color: white;
    color: black;
    border-color: black;
  }
`;

const PriceWrapper = styled.div`
  margin-left: 11rem;
  margin-top: 0.6rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.p_homeTitle_eng}
  background-color:  ${({ theme }) => theme.color.yellow};
  color: black;
  padding: 0 0.5rem;
  margin: 0;
  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
`;
const TitleWrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  margin-left: 9.5rem;
  margin-top: 3rem;
  @media (max-width: 48rem) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const NavBtn = styled.div`
  border: 1px solid #000;
  background: #fff;
  ${({ theme }) => theme.font.p_btn}
  color: #000;
  padding: 0.25rem 1.125rem;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.125rem;
  margin-top: 1.41rem;
  margin-right: 9.79rem;
`;

const Line = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 100;

  ${({ position }) =>
    position === 'top' &&
    `
    top: 6.25rem; 
    left: 0rem; 
    right: 0rem; 
    height: 1px;
  `}

  ${({ position }) =>
    position === 'bottom' &&
    `
    top: 11.06rem; 
    left: 0rem; 
    right: 0rem; 
    height: 1px;
  `}

  ${({ position }) =>
    position === 'left' &&
    `
    top: 0rem; 
    bottom: 0rem; 
    left: 8.75rem; 
    width: 1px;
    height: 200vh;
  `}

  ${({ position }) =>
    position === 'right' &&
    `
    top: 0rem; 
    bottom: 0rem; 
    right: 8.75rem; 
    width: 1px;
    height: 200vh;
  `}
`;

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${backgroundEg});
  background-repeat: repeat;
  background-size: 320px 350px;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: overlay;
  background-position: top left; /* 이미지가 반복되도록 시작점 설정 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
