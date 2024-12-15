import styled from 'styled-components';
import {
  OptionColor,
  OptionOther,
  OptionSize,
  HeartLine,
  HeartFull,
  Plus,
} from '@/assets/icons';
import { useState } from 'react';

const WishRegister = () => {
  const [heartCount, setHeartCount] = useState(0);
  const handleHeartClick = (index) => {
    setHeartCount(index + 1);
  };

  const [isActive, setIsActive] = useState(false);
  const handleBagClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Wrapper>
      <Container>
        <Line position="top" />
        <Line position="bottom" />
        <Line position="left" />
        <Line position="right" />
        <TitleContainer>
          <TitleWrapper
            style={{
              alignItems: 'flex-start',
              margin: '0.625rem 0 0 0.625rem',
            }}
          >
            <Title style={{ width: '30.3rem' }}>WHAT DO</Title>
          </TitleWrapper>
          <TitleWrapper
            style={{ alignItems: 'flex-end', margin: '0 1.25rem 0.625rem 0' }}
          >
            <Title style={{ width: '39.3rem' }}>YOU WANT ?</Title>
          </TitleWrapper>
        </TitleContainer>

        <Content>
          <ImgInput>
            <label className="input-file-button" htmlFor="input-file">
              Add your <br /> wish link!
            </label>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </ImgInput>
          <OtherInput>
            <p>Wish Link.*</p>
            <input />
            <p>Wish Name.*</p>
            <input />
            <p>Wish Price.*</p>
            <input />
            <p>Wish Option.</p>
            <OptionInput>
              <OptionSize style={{ color: 'white' }} />
              <input
                placeholder="size"
                style={{ width: '9.4375rem', margin: '0 1rem 0 0.5625rem' }}
              />
              <OptionColor />
              <input
                placeholder="color"
                style={{ width: '9.4375rem', margin: '0 1rem 0 0.5625rem' }}
              />
              <OptionOther />
              <input
                placeholder="other option"
                style={{ width: '9.4375rem', margin: '0 0 0 0.5625rem' }}
              />
            </OptionInput>

            <p>Wish Category.*</p>
            <CategoryInput>
              <div
                onClick={handleBagClick}
                className={isActive ? 'active' : ''}
              >
                Bag
              </div>{' '}
              {/* 클릭 시 상태 반영 */}
              <Plus />
            </CategoryInput>

            <p>Heart Your Wish.*</p>
            <HeartInput>
              {[...Array(5)].map((_, index) => (
                <div key={index} onClick={() => handleHeartClick(index)}>
                  {index < heartCount ? <HeartFull /> : <HeartLine />}
                </div>
              ))}
            </HeartInput>
          </OtherInput>
        </Content>
        <DoneBtn>Done</DoneBtn>
      </Container>
    </Wrapper>
  );
};

export default WishRegister;

const DoneBtn = styled.button`
  position: absolute;
  right: 6.125rem;
  top: 66.5625rem;
  border: 0;
  background-color: #bebebe;
  color: #fff;
  ${({ theme }) => theme.font.p_btn}
  width: 6.5625rem;
  height: 2.625rem;
  padding: 0.375rem 1.375rem;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: #000;
  }
`;

const HeartInput = styled.div`
  display: flex;
  gap: 0.4375rem;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CategoryInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 2rem;
  div {
    cursor: pointer;
    width: 8.625rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    border: 1px solid #fff;
    ${({ theme }) => theme.font.common_text}
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    &.active,
    &:hover {
      background-color: ${({ theme }) => theme.color.orange};
      border: 1px solid ${({ theme }) => theme.color.orange};
    }
  }
`;

const OptionInput = styled.div`
  display: flex;
  align-items: center;
  height: 3.25rem;
  margin-bottom: 2rem;
`;

const OtherInput = styled.div`
  p {
    ${({ theme }) => theme.font.common_detail}
    margin-bottom: 0.25rem;
  }
  input {
    margin-bottom: 2rem;
    background-color: transparent;
    border: 1px solid #fff;
    width: 28.875rem;
    height: 3.25rem;
    padding: 0.9375rem 1.25rem;
    ${({ theme }) => theme.font.common_input}
    color: white;
  }
  input::placeholder {
    ${({ theme }) => theme.font.common_input}
    color: #BEBEBE;
  }
`;

const ImgInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 31.25rem;
  border: 1px solid #fff;
  margin-right: 5rem;
  background-image: url('/svg/InputImg.svg');
  label {
    ${({ theme }) => theme.font.p_popTitle}
    color: ${({ theme }) => theme.color.white};
  }
`;

const Content = styled.div`
  display: flex;
  margin: 5.3125rem 3.75rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.p_homeTitle_eng}
  background-color:  ${({ theme }) => theme.color.yellow};
  color: black;
  padding: 0 0.5rem;
  margin: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.375rem;
  width: 75rem;
  height: 18.5rem;
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
    top: 24.75rem; 
    left: 0rem; 
    right: 0rem; 
    height: 1px;
  `}

  ${({ position }) =>
    position === 'left' &&
    `
    top: 0rem; 
    bottom: 0rem; 
    left: 2.5rem; 
    width: 1px;
    height: 200vh;
  `}

  ${({ position }) =>
    position === 'right' &&
    `
    top: 0rem; 
    bottom: 0rem; 
    right: 2.5rem; 
    width: 1px;
    height: 200vh;
  `}
`;

const Container = styled.div`
  margin: 6.25rem 2.5rem;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  /* width: 100vw; */
  height: 200vh;
  background-color: ${({ theme }) => theme.color.mint};
`;
