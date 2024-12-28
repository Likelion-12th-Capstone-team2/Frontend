import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartFullBlue } from '@/assets/icons';
import backgroundEg from '@/assets/backgroundEg.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import hamburger from '@/assets/hamburger.svg';

const WishDetail = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUnsendPopupVisible, setIsUnsendPopupVisible] = useState(false);
  const itemId =
    location.state?.itemId ||
    new URLSearchParams(location.search).f8get('itemId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemId) {
      console.error('Item ID is missing');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://ireallywantit.xyz/wish/items/${itemId}/`,
          { headers },
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch item data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No access token found');
      }

      const receiver_id = data.receiver_id;
      if (!receiver_id || !itemId) {
        throw new Error('Receiver ID or Item ID is missing');
      }

      const response = await axios.post(
        `http://ireallywantit.xyz/wish/items/${receiver_id}/${itemId}/gifts/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setData((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          is_sended: response.data.is_sended,
          sender: data.setting.name,
        },
      }));

      setIsPopupVisible(false);
      alert('Gift sent successfully!');
    } catch (error) {
      console.error('Failed to send gift:', error);
      alert('Failed to send gift.');
    }
  };

  const handleUnsend = async () => {
    try {
      const token = localStorage.getItem('token');
      const receiver_id = data.receiver_id;
      const response = await axios.delete(
        `http://ireallywantit.xyz/wish/items/${receiver_id}/${itemId}/gifts/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setData((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          is_sended: response.data.is_sended,
          sender: '',
        },
      }));
      setIsUnsendPopupVisible(false);
      alert('Gift sending canceled successfully!');
    } catch (error) {
      console.error('Failed to unsend gift:', error);
      alert('Failed to unsend gift.');
    }
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
    alert('Complete Logout.');
  };

  return (
    <Wrapper backgroundImage={data.setting.background_photo || backgroundEg}>
      <Container>
        <NavContainer>
          <NavBtn>Ding!</NavBtn>
          <NavBtn>Setting</NavBtn>
          <NavBtn onClick={handleLogout}>Log out</NavBtn>
          <HamburgerIcon src={hamburger} alt="Menu" />
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
            <BottomDetail>
              <WishBtnContainer>
                <WishBtn
                  onClick={() => {
                    if (
                      typeof data.user === 'number' ||
                      data.user === 'guest'
                    ) {
                      if (data.user === 'guest') {
                        alert('Login is required to access this feature.');
                        navigate('/');
                      } else {
                        navigate('/wishAdd', { state: { itemToAdd: data } });
                      }
                    } else {
                      handleEditDetailsClick();
                    }
                  }}
                >
                  {typeof data.user === 'number' || data.user === 'guest'
                    ? 'Add to my wishlist'
                    : 'Edit details'}
                </WishBtn>

                <WishBtn
                  onClick={() => {
                    const currentUrl = window.location.href;
                    const shareUrl = `${currentUrl}?itemId=${itemId}`;
                    navigator.clipboard
                      .writeText(shareUrl)
                      .then(() => {
                        alert('Link copied to clipboard!');
                      })
                      .catch((err) => {
                        console.error('Failed to copy link:', err);
                        alert('Failed to copy the link. Please try again.');
                      });
                  }}
                >
                  Share
                </WishBtn>

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
                  <p style={{}}>Received?</p>
                  <ReceiveStatus isSended={data.item.is_sended}>
                    {data.item.is_sended ? 'Yes' : 'Not yet.'}
                  </ReceiveStatus>
                </div>
                <From
                  isOnMe={typeof data.user === 'number' && !data.item.is_sended}
                  onClick={() => {
                    if (data.user === 'guest') {
                      alert('Login is required to access this feature.');
                      navigate('/');
                    } else {
                      handleFromClick();
                    }
                  }}
                >
                  {data.item.is_sended
                    ? `From. ${localStorage.getItem('username') || ''}`
                    : typeof data.user === 'number'
                      ? 'On me!!'
                      : ''}
                </From>
              </ReceiveCheck>
            </BottomDetail>
          </DetailContainer>
        </Content>
      </Container>
      {isPopupVisible && (
        <PopupOverlay>
          <PopupContainer>
            <PopupQ>Do you wanna gift this?</PopupQ>
            <PopupContent>
              <PopupItemImage
                src={data.item.item_image}
                alt={data.item.item_name}
              ></PopupItemImage>
              <PopupText>
                <PopupItemName>{data.item.item_name}</PopupItemName>
                <Price>
                  <p>price.</p>
                  <p>{data.item.price}</p>
                </Price>
              </PopupText>
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
            <PopupQ>Changed your mind?</PopupQ>
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
  ${({ theme }) => theme.mobile} {
    width: 81%;
    height: auto;
    /* padding-bottom: 40%; */
  }
`;

const PopupContent = styled.div`
  padding: 1.1rem 2.1rem 1.9rem 2.1rem;
  display: flex;
  gap: 1.05rem;
  ${({ theme }) => theme.mobile} {
    padding: 20% 14% 0 14%;
    width: 100%;
    height: 100%;
    display: flex;
  }
`;

const PopupQ = styled.p`
  width: 100%;
  background-color: black;
  height: 3.9rem;
  padding: 1rem 1.25rem;
  ${({ theme }) => theme.font.p_popTitle}
  ${({ theme }) => theme.mobile} {
    ${({ theme }) => theme.font.common_text}
    height: 4.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopupText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const PopupItemImage = styled.img`
  width: 9.188rem;
  height: 11.5rem;
  ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const PopupItemName = styled.div`
  ${({ theme }) => theme.font.p_popTitle_eng}
  margin-bottom: 1.15rem;
  ${({ theme }) => theme.mobile} {
    ${({ theme }) => theme.font.m_popTitle_eng}
  }
`;

const PopupActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  width: 93%;
  margin: 1.25rem 0;
  ${({ theme }) => theme.mobile} {
    justify-content: center;
    width: 99%;
    margin: 20% 0;
    gap: 1.875rem;
  }
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
  ${({ theme }) => theme.mobile} {
    margin-top: 0.875rem;
  }
  div {
    display: flex;
    p {
      margin-right: 2.7rem;
      ${({ theme }) => theme.mobile} {
        ${({ theme }) => theme.font.common_text}
      }
    }
  }
`;

const WishBtn = styled.div`
  ${({ theme }) => theme.font.common_detail}
  color: #000;
  padding: 0.25rem 1.125rem;
  background: #fff;
  width: max-content;
  cursor: pointer;
`;

const WishBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.05rem 0.4rem;
  gap: 0.75rem;
  width: fit-content;
  ${({ theme }) => theme.mobile} {
    gap: 1rem;
    margin: 1.875rem 0 0 0;
  }
`;

const BottomDetail = styled.div`
  ${({ theme }) => theme.mobile} {
    display: flex;
    flex-direction: column-reverse;
  }
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
  ${({ theme }) => theme.mobile} {
    margin: 1.875rem 0 0.875rem 0;
  }
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

  ${({ theme }) => theme.mobile} {
    ${({ theme }) => theme.font.m_detail_eng}
  }
`;

const Heart = styled.div``;

const CategoryName = styled.div`
  ${({ theme }) => theme.font.p_category}
  background-color: ${({ theme }) => theme.color.mint};
  padding: 0.0625rem 0.5rem;

  ${({ theme }) => theme.mobile} {
    ${({ theme }) => theme.font.m_detail_category}
  }
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
  width: 23.75rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  ${({ theme }) => theme.mobile} {
    width: 100%;
    aspect-ratio: 5 / 6; /* 가로:세로 비율 고정 */
  }
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
  ${({ theme }) => theme.mobile} {
    display: flex;
    flex-direction: column;
    margin-top: 6%;
    width: 100%;
    gap: 1.875rem;
  }
  img {
    width: 23.75rem;
    height: 30rem;
    object-fit: cover;
    ${({ theme }) => theme.mobile} {
      width: 100%;
      aspect-ratio: 5 / 6; /* 가로:세로 비율 고정 */
      object-fit: cover; /* 이미지 비율 유지하며 꽉 채움 */
    }
  }
`;

const HamburgerIcon = styled.img`
  display: none;

  ${({ theme }) => theme.mobile} {
    display: block; /* 모바일에서만 보임 */
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`;

const NavBtn = styled.div`
  border: 1px solid #000;
  background: #fff;
  ${({ theme }) => theme.font.m_btn}
  color: #000;
  padding: 0.25rem 1.125rem;
  cursor: pointer;
  ${({ theme }) => theme.mobile} {
    display: none; /* 모바일에서는 숨김 */
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.125rem;
`;

const Container = styled.div`
  margin: 1.406rem 10rem;
  ${({ theme }) => theme.mobile} {
    margin: 4.1%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200vh;
  background-image: url(${(props) => props.backgroundImage || backgroundEg});
  background-repeat: repeat;
  background-size: 320px 350px;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: overlay;
  ${({ theme }) => theme.mobile} {
    height: 200vh;
  }
`;
