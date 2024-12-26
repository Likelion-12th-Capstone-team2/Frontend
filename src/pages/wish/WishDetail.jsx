import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartFullBlue } from '@/assets/icons';
import backgroundEg from '@/assets/backgroundEg.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const WishDetail = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUnsendPopupVisible, setIsUnsendPopupVisible] = useState(false);

  const { itemId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://ireallywantit.xyz/wish/items/${itemId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch item data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSend = () => {
    setData((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        is_sended: true,
        sender: data.setting.name,
      },
    }));
    setIsPopupVisible(false);
  };

  const handleUnsend = () => {
    setData((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        is_sended: false,
        sender: '',
      },
    }));
    setIsUnsendPopupVisible(false);
  };

  const handleFromClick = () => {
    if (data.item.is_sended) {
      setIsUnsendPopupVisible(true);
    } else {
      setIsPopupVisible(true);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleEditDetailsClick = () => {
    navigate('/wishRegister', { state: { itemToEdit: data } });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper backgroundImage={data.setting.background_photo || backgroundEg}>
      <Container>
        <NavContainer>
          <NavBtn>Ding!</NavBtn>
          <NavBtn>Setting</NavBtn>
          <NavBtn>Log out</NavBtn>
        </NavContainer>
        <Content>
          <img src={data.item.item_image} alt={data.item.item_name} />
          {data.item.is_sended && (
            <Overlay>
              <OverlayText>Received</OverlayText>
            </Overlay>
          )}
          <DetailContainer>
            <TopDetail>
              <CategoryName>{data.item.category}</CategoryName>
              <Heart>
                {Array.from({ length: data.item.heart }).map((_, index) => (
                  <HeartFullBlue key={index} />
                ))}
              </Heart>
            </TopDetail>
            <WishName>{data.item.item_name}</WishName>
            <Option>
              <p>option.</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <OptionList>
                  <Icon>S</Icon>
                  <p>{data.item.size || 'N/A'}</p>
                </OptionList>
                <OptionList>
                  <Icon>C</Icon>
                  <p>{data.item.color || 'N/A'}</p>
                </OptionList>
                <OptionList>
                  <Icon>O</Icon>
                  <p>{data.item.other_option || 'N/A'}</p>
                </OptionList>
              </div>
            </Option>
            <Price>
              <p>price.</p>
              <p>{data.item.price}</p>
            </Price>
            <WishBtnContainer>
              <WishBtn
                onClick={() => {
                  if (typeof data.user !== 'number') {
                    handleEditDetailsClick();
                  }
                }}
              >
                {typeof data.user === 'number'
                  ? 'Add to my wishlist'
                  : 'Edit details'}
              </WishBtn>

              <WishBtn>Share via KakaoTalk</WishBtn>
              <WishBtn
                style={{ backgroundColor: 'orange' }}
                onClick={() => {
                  if (data.item.wish_link) {
                    window.open(data.item.wish_link, '_blank');
                  } else {
                    alert('No link available.');
                  }
                }}
              >
                See the link
              </WishBtn>
            </WishBtnContainer>
            <ReceiveCheck>
              <div>
                <p>Received?</p>
                <ReceiveStatus isSended={data.item.is_sended}>
                  {data.item.is_sended ? 'Yes' : 'Not yet.'}
                </ReceiveStatus>
              </div>
              <From
                isOnMe={typeof data.user === 'number' && !data.item.is_sended}
                onClick={handleFromClick}
              >
                {data.item.is_sended
                  ? `From. ${localStorage.getItem('username') || ''}`
                  : typeof data.user === 'number'
                    ? 'On me!!'
                    : ''}
              </From>
            </ReceiveCheck>
          </DetailContainer>
        </Content>
      </Container>
      {isPopupVisible && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>Do you wanna gift this?</PopupText>
            <PopupContent>
              <PopupItemImage
                src={data.item.item_image}
                alt={data.item.item_name}
              ></PopupItemImage>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <PopupItemName>{data.item.item_name}</PopupItemName>
                <PopupPrice>price. {data.item.price}</PopupPrice>
              </div>
            </PopupContent>
            <PopupActions>
              <PopupButton onClick={() => setIsPopupVisible(false)}>
                No
              </PopupButton>
              <PopupButton onClick={handleSend}>Yes</PopupButton>
            </PopupActions>
          </PopupContainer>
        </PopupOverlay>
      )}
      {isUnsendPopupVisible && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>Changed your mind?</PopupText>
            <PopupActions>
              <PopupButton onClick={() => setIsUnsendPopupVisible(false)}>
                No
              </PopupButton>
              <PopupButton onClick={handleUnsend}>Yes</PopupButton>
            </PopupActions>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Wrapper>
  );
};

export default WishDetail;

const ReceiveStatus = styled.p`
  color: ${({ theme, isSended }) => (isSended ? theme.color.orange : 'white')};
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  background-color: #168395;
  box-shadow: 4px 4px 0px 0px #0e0a04;
  width: 32.55rem;
`;

const PopupContent = styled.div`
  padding: 1.1rem 2.1rem 1.9rem 2.1rem;
  display: flex;
  gap: 1.05rem;
`;

const PopupText = styled.p`
  width: 100%;
  background-color: black;
  height: 3.9rem;
  padding: 1rem 1.25rem;
  ${({ theme }) => theme.font.p_popTitle}
`;

const PopupItemImage = styled.img`
  width: 9.188rem;
  height: 11.5rem;
`;

const PopupItemName = styled.div`
  ${({ theme }) => theme.font.p_popTitle_eng}
  margin-bottom: 1.15rem;
`;
const PopupPrice = styled.div``;
const PopupActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  width: 93%;
  margin: 1.25rem 0;
`;

const PopupButton = styled.button`
  padding: 0.25rem 1.125rem;
  width: 4.375rem;
  color: white;
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.font.p_btn}

  &:nth-child(1) {
    background: black;
  }
  &:nth-child(2) {
    background: #ffa100;
  }
`;

const From = styled.div`
  cursor: pointer;
  width: max-content;
  margin-top: 0.6rem;
  padding: 0rem 1rem;
  border-radius: 1rem;
  background: ${({ isOnMe }) => (isOnMe ? 'orange' : '#616161')};
  color: ${({ isOnMe }) => (isOnMe ? 'black' : '#a3a3a3')};
  ${({ theme }) => theme.font.common_detail_eng};
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
  p {
    ${({ theme }) => theme.font.common_text}
    margin-right: 4.48rem;
  }
`;

const Icon = styled.div`
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
  align-items: flex-start;
  margin: 0.9rem 0 0.6rem 0;
  p {
    ${({ theme }) => theme.font.common_text}
    margin-right: 3.838rem;
  }
`;

const OptionList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const DetailContainer = styled.div``;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 23.75rem; /* 이미지 크기와 동일하게 설정 */
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const OverlayText = styled.div`
  transform: rotate(-30deg);
  color: white;
  font-size: 65.6px;
  font-family: Pridi;
  font-weight: 275;
  word-wrap: break-word;
`;

const Content = styled.div`
  display: flex;
  gap: 5rem;
  margin-top: 5rem;
  position: relative;
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
  background-image: url(${(props) => props.backgroundImage || backgroundEg});
  background-repeat: repeat;
  background-size: 320px 350px;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: overlay;
`;
