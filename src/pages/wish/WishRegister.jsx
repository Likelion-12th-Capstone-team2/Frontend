import styled from 'styled-components';
import { HeartLine, HeartFull } from '@/assets/icons';
import React, { useState } from 'react';
import axios from 'axios';

const WishRegister = () => {
  const [heartCount, setHeartCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    item_name: '',
    wish_link: '',
    item_image: '',
    price: '',
    size: '',
    color: '',
    other_option: '',
    category: '',
  });
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  const handleHeartClick = (index) => {
    setHeartCount(index + 1);
  };

  const handleBagClick = () => {
    setIsActive(!isActive);
    setFormData((prev) => ({
      ...prev,
      category: isActive ? '' : 12, // 예시로 category 12 설정
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWishLinkBlur = async () => {
    if (!formData.wish_link) return;

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        console.error('No access token found');
        return;
      }

      const response = await axios.post(
        'http://ireallywantit.xyz/crawler/crawl/',
        { url: formData.wish_link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { product_name, product_price, product_image } = response.data;
      setFormData((prev) => ({
        ...prev,
        item_name: product_name,
        price: product_price,
        item_image: product_image,
      }));
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('상품 정보를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('item_name', formData.item_name);
    formDataToSend.append('wish_link', formData.wish_link);
    formDataToSend.append('item_image', formData.item_image);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('other_option', formData.other_option);
    formDataToSend.append('heart', heartCount);
    formDataToSend.append('category', formData.category);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://ireallywantit.xyz/wish/<pk:user_id>/',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      alert('Wish 등록 성공!');
      console.log(response.data);
    } catch (error) {
      console.error('Error posting wish:', error);
      alert('Wish 등록 실패!');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Line position="top" />
        <Line position="bottom" />
        <Line position="left" />
        <Line position="right" />
        <TitleContainer>
          <Title>WHAT DO YOU WANT ?</Title>
        </TitleContainer>

        <Content>
          <ImgInput>
            {formData.item_image ? (
              <img
                src={formData.item_image}
                alt="상품 이미지"
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <>
                <label className="input-file-button" htmlFor="input-file">
                  Add your
                </label>
                <label className="input-file-button" htmlFor="input-file">
                  wish link!
                </label>
                <input
                  type="file"
                  id="input-file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled
                />
              </>
            )}
          </ImgInput>
          <OtherInput>
            <p>Wish Link.*</p>
            <input
              name="wish_link"
              onBlur={handleWishLinkBlur}
              onChange={handleInputChange}
              placeholder="Enter Wish Link"
            />
            {loading && <p>Loading product details...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Wish Name.*</p>
            <input
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange}
              readOnly
            />
            <p>Wish Price.*</p>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              readOnly
            />
            <p>Wish Option.</p>
            <OptionInput>
              <div>S</div>
              <input
                name="size"
                placeholder="size"
                style={{ width: '7.563rem', margin: '0 1rem 0 0.563rem' }}
                onChange={handleInputChange}
              />
              <div>C</div>
              <input
                name="color"
                placeholder="color"
                style={{ width: '7.563rem', margin: '0 1rem 0 0.563rem' }}
                onChange={handleInputChange}
              />
              <div>O</div>
              <input
                name="other_option"
                placeholder="other option"
                style={{ width: '7.563rem', margin: '0 0 0 0.563rem' }}
                onChange={handleInputChange}
              />
            </OptionInput>

            <p>Wish Category.*</p>
            <CategoryInput>
              <div
                onClick={handleBagClick}
                className={isActive ? 'active' : ''}
              >
                Bag
              </div>
              <p>+</p>
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
        <DoneBtn onClick={handleSubmit}>Done</DoneBtn>
      </Container>
    </Wrapper>
  );
};

export default WishRegister;

const DoneBtn = styled.button`
  position: absolute;
  right: 12.963rem;
  top: 41.375rem;
  border: 0;
  background-color: #bebebe;
  color: #fff;
  ${({ theme }) => theme.font.m_btn}
  width: 5rem;
  height: 1.813rem;
  padding: 0.25rem 1.125rem;
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
    width: 6.688rem;
    height: 2rem;
    border-radius: 1.25rem;
    border: 1px solid #fff;
    ${({ theme }) => theme.font.common_detail}
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    &.active,
    &:hover {
      background-color: ${({ theme }) => theme.color.orange};
      border: 1px solid ${({ theme }) => theme.color.orange};
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.0625rem solid white;
    border-radius: 50%;
    ${({ theme }) => theme.font.common_detail}
  }
`;

const OptionInput = styled.div`
  display: flex;
  align-items: center;
  height: 2.625rem;
  margin-bottom: 2rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.0625rem solid white;
    border-radius: 50%;
    ${({ theme }) => theme.font.common_detail}
  }
`;

const OtherInput = styled.div`
  p {
    ${({ theme }) => theme.font.common_detail}
    margin-bottom: 0.25rem;
  }
  input {
    margin-bottom: 1.6rem;
    background-color: transparent;
    border: 1px solid #fff;
    width: 23.375rem;
    height: 2.25rem;
    padding: 0.438em 1.063rem;
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
  flex-direction: column;
  width: 20rem;
  height: 25rem;
  border: 1px solid #fff;
  margin-right: 4rem;
  background: ${({ theme }) => theme.color.orange};
  background-image: linear-gradient(
      ${({ theme }) => theme.color.mint} 4.8rem,
      transparent 4.8rem
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.color.mint} 4.8rem,
      transparent 4.8rem
    );
  background-size: 4.8rem 4.8rem;
  label {
    text-align: center;
    font-family: Pridi;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.color.white};
  }
`;

const Content = styled.div`
  display: flex;
  margin: 1.875rem 3.25rem 1.25rem 4.1875rem;
  position: relative;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.p_homeTitle_eng}
  background-color:  ${({ theme }) => theme.color.yellow};
  color: black;
  padding: 0 0.521rem;
  margin: 0;
  width: fit-content;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625rem 0.521rem;
  width: fit-content;
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
    top: 11.063rem; 
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

const Container = styled.div`
  margin: 6.25rem 8.75rem;
  width: 62.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  /* width: 100vw; */
  height: 150vh;
  background-color: ${({ theme }) => theme.color.mint};
`;
