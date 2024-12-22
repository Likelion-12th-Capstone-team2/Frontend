import styled from 'styled-components';
import { useState } from 'react';
import { HeartFullBlue } from '@/assets/icons';
import backgroundEg from '@/assets/backgroundEg.png';
import wishEg from '@/assets/wishEg.jpg';

const WishDetail = () => {
  return (
    <Wrapper>
      <Container>
        <NavContainer>
          <NavBtn>Ding!</NavBtn>
          <NavBtn>Setting</NavBtn>
          <NavBtn>Log out</NavBtn>
        </NavContainer>
        <Content>
          <img src={wishEg} alt="Wish Example" />
          <DetailContainer>
            <TopDetail>
              <CategoryName>Interior</CategoryName>
              <Heart>
                <HeartFullBlue />
              </Heart>
            </TopDetail>
            <WishName>baby furry lamp</WishName>
            <Option>
              <p>option.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconColor>C</IconColor>
                <p>color</p>
              </div>
            </Option>
            <Price>
              <p>price.</p>
              <p>₩ 61,200</p>
            </Price>
            <WishBtnContainer>
              <WishBtn>Edit details</WishBtn>
              <WishBtn>Share via KakaoTalk</WishBtn>
              <WishBtn style={{ backgroundColor: 'orange' }}>
                See the link
              </WishBtn>
            </WishBtnContainer>
            <ReceiveCheck>
              <div>
                <p>Received?</p>
                <p>Not yet.</p>
              </div>
              <From>From. 선우</From>
            </ReceiveCheck>
          </DetailContainer>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default WishDetail;

const From = styled.div`
  width: max-content;
  margin-top: 0.6rem;
  padding: 0rem 1rem;
  border-radius: 1rem;
  background: #616161;
  color: #a3a3a3;
  ${({ theme }) => theme.font.common_detail_eng}
`;

const ReceiveCheck = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    gap: 1.7rem;
    p {
      margin: 0.125rem 0.5rem;
    }
  }
`;

const WishBtn = styled.div`
  ${({ theme }) => theme.font.common_detail}
  color: #000;
  padding: 0.25rem 1.125rem;
  background: #fff;
  width: max-content;
`;

const WishBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.05rem 0.4rem;
  gap: 0.75rem;
  width: fit-content;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 11.188rem;
  p {
    ${({ theme }) => theme.font.common_text}
  }
`;

const IconColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.0625rem solid white;
  background-color: transparent;
  border-radius: 50%;
  ${({ theme }) => theme.font.common_detail}
  margin-right: 0.5rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 11.188rem;
  margin: 0.9rem 0 0.6rem 0;
  p {
    ${({ theme }) => theme.font.common_text}
  }
`;

const WishName = styled.div`
  ${({ theme }) => theme.font.p_detail_eng}
`;

const Heart = styled.div``;

const CategoryName = styled.div`
  ${({ theme }) => theme.font.p_category}
  background-color: ${({ theme }) => theme.color.mint};
  padding: 0.0625rem 0.5rem;
`;

const TopDetail = styled.div`
  width: 31.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailContainer = styled.div``;

const Content = styled.div`
  display: flex;
  gap: 5rem;
  margin-top: 5.886rem;
  img {
    width: 23.75rem;
    height: 30rem;
    object-fit: cover;
  }
`;

const NavBtn = styled.div`
  border: 1px solid #000;
  background: #fff;
  ${({ theme }) => theme.font.m_btn}
  color: #000;
  padding: 0.25rem 1.125rem;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.125rem;
`;

const Container = styled.div`
  margin: 1.406rem 10rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${backgroundEg});
  background-repeat: repeat;
  background-size: 320px 350px;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: overlay;
`;
