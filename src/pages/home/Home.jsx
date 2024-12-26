import styled from 'styled-components';
import backgroundEg from '@/assets/backgroundEg.png';
import { Delete } from '@/assets/icons';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(true); // 처음에는 메시지 표시
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 선택된 카테고리 상태 추가
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 선택된 카테고리 ID 추가
  const [selectedPrice, setSelectedPrice] = useState(null); // 선택된 가격 상태 추가
  const [showDeleteIcons, setShowDeleteIcons] = useState(false); // <Delete> 아이콘 표시 상태
  const [settings, setSettings] = useState({
    name: '',
    backgroundPhoto: '',
  });
  const [categories, setCategories] = useState([{ name: 'All', id: null }]); // 카테고리 상태

  const confirmDelete = async () => {
    const token = localStorage.getItem('token'); // 인증 토큰 가져오기
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/wish/items/${productToDelete.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // 삭제 성공 시 UI에서 해당 상품 제거
      setProducts((prev) =>
        prev.filter((item) => item.id !== productToDelete.id),
      );
      setProductToDelete(null); // 삭제 대상 초기화
      setShowPopup(false); // 팝업 닫기
      alert('상품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  const fetchProductDetails = async (productId) => {
    const token = localStorage.getItem('token'); // 인증 토큰 가져오기
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/wish/items/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      setProductToDelete(response.data); // 서버에서 받아온 데이터 저장
      const item = response.data.item; // item은 객체
      const productDetails = {
        id: item.id,
        is_sended: item.is_sended || false, // 기본값 설정
        item_image: item.item_image,
        hearts: item.heart || 0, // 기본값 설정
        name: item.item_name, // 상품 이름
        price: item.price, // 상품 가격
        category: item.category || 'N/A', // 상품 카테고리
        color: item.color || 'N/A', // 상품 색상
        size: item.size || 'N/A', // 추가: 상품 사이즈
        other_option: item.other_option || 'N/A', // 추가: 상품 사이즈
      };

      setProductToDelete(productDetails);

      setShowPopup(true); // 팝업 띄우기
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      alert('상품 정보를 가져오는데 실패했습니다.');
    }
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');

    try {
      const queryParams = new URLSearchParams();
      if (selectedPrice !== null) queryParams.append('price', selectedPrice);
      if (selectedCategoryId !== null)
        queryParams.append('category', selectedCategoryId);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/wish/${user_id}/?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      setSettings({
        name: data.setting.name,
        backgroundPhoto: data.setting.background_photo,
        color: data.setting.color,
        typography: data.setting.typography,
      });

      const categoryList = data.catagory.map((cat) => ({
        name: cat.category,
        id: cat.id,
      }));
      setCategories([{ name: 'All', id: null }, ...categoryList]);
      setProducts(data.wish_items);
      setShowMessage(data.wish_items.length === 0);
      console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedPrice, selectedCategoryId]);

  const handleDeleteClick = (productId) => {
    fetchProductDetails(productId); // 버튼 클릭 시 상품 상세 정보 요청
  };

  const selectPrice = (price) => {
    setSelectedPrice(price);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowPopup(false);
  };

  const selectCategory = (category, categoryId) => {
    setSelectedCategory(category);
    setSelectedCategoryId(categoryId);
  };
  const toggleDeleteMode = () => {
    setShowDeleteIcons((prev) => !prev); // 삭제 모드 토글
  };

  // 카테고리에 따라 상품 필터링
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${settings.backgroundPhoto})`,
      }}
    >
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
          <Title
            style={{
              backgroundColor: settings.color,
              fontFamily: settings.typography,
            }}
          >
            {settings.name}'s
          </Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title
            style={{
              backgroundColor: settings.color,
              fontFamily: settings.typography,
            }}
          >
            WISH LIST
          </Title>
        </TitleWrapper>
      </TitleContainer>
      <PriceWrapper>
        <Price onClick={() => selectPrice(0)}>~30,000</Price>
        <Price onClick={() => selectPrice(30000)}>30,000~50,000</Price>
        <Price onClick={() => selectPrice(50000)}>50,000~100,000</Price>
        <Price onClick={() => selectPrice(100000)}>100,000~</Price>
      </PriceWrapper>
      <CatagoryContainer>
        <CategoryWrapper>
          {categories.map((category) => (
            <CategoryButton
              key={category.id || 'all'}
              selected={selectedCategory === category.name}
              onClick={() => selectCategory(category.name, category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryWrapper>
      </CatagoryContainer>
      <WishWrapper>
        {showMessage ? (
          <ClickWish onClick={fetchProducts}>
            Click Here and Categorize Your WISH
          </ClickWish>
        ) : (
          <MiddleWrapper>
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} received={product.is_sended}>
                  <ProductImage
                    src={product.item_image}
                    alt={`Product ${product.id}`}
                  />
                  {product.is_sended && (
                    <ReceivedOverlay>
                      <Text>Received</Text>
                    </ReceivedOverlay>
                  )}
                  {showDeleteIcons && (
                    <Delete
                      style={{
                        position: 'absolute',
                        top: '0.3rem',
                        right: '0.3rem',
                        zIndex: 100,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDeleteClick(product.id)}
                    ></Delete>
                  )}
                  {!product.is_sended && <ShadowOveraly></ShadowOveraly>}
                  <HeartContainer received={product.is_sended}>
                    {Array(product.hearts)
                      .fill('♥')
                      .map((heart, index) => (
                        <Heart key={index}>{heart}</Heart>
                      ))}
                  </HeartContainer>
                </ProductCard>
              ))}
            </ProductGrid>
            <BottomWrapper>
              <button onClick={toggleDeleteMode}>
                {showDeleteIcons ? 'done' : 'delete'}
              </button>
              <button onClick={() => navigate('/wishRegister')}>Add</button>
            </BottomWrapper>
          </MiddleWrapper>
        )}
      </WishWrapper>

      {showPopup && productToDelete && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>Do you wanna delete this?</PopupText>
            <PopupItemImage
              src={productToDelete.item_image}
              alt={productToDelete.name}
            ></PopupItemImage>
            <PopupItemName>{productToDelete.name}</PopupItemName>
            <PopupPrice>
              Price: {productToDelete.price?.toLocaleString()} 원
            </PopupPrice>
            <PopupOption>
              <span>ⓒ {productToDelete.color} </span>
              <span>ⓢ {productToDelete.size} </span>
              <span>ⓞ {productToDelete.other_option} </span>
            </PopupOption>
            <PopupActions>
              <PopupButton onClick={cancelDelete}>No</PopupButton>
              <PopupButton onClick={confirmDelete}>Yes</PopupButton>
            </PopupActions>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Wrapper>
  );
};

export default Home;
const PopupOption = styled.div``;
const MiddleWrapper = styled.div``;
const BottomWrapper = styled.div``;
const CatagoryContainer = styled.div`
  width: 79%;
  height: 9rem;
  position: relative; /* 자식 요소의 위치를 제한 */
  display: flex;
  align-items: center;
  margin-left: 11rem;
  overflow: hidden;
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transform: rotate(-90deg);
  transform-origin: top left; /* 회전 기준점 설정 */
  position: absolute;
  top: 100%;
  white-space: nowrap; /* 요소가 한 줄로 유지되도록 설정 */
`;

const CategoryButton = styled.p`
  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
  padding: 0.5rem 0.125rem;
  background-color: black;
  color: white;
  cursor: pointer;
  border: none;
  width: fit-content;
  ${({ theme }) => theme.font.p_category}

  &:hover {
    background-color: white;
    color: black;
  }
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
  height: 21.75rem;
`;

const PopupText = styled.p`
  width: 100%;
  background-color: black;
  margin-bottom: 1rem;
  height: 3.9rem;
  padding: 1rem 1.25rem;
  ${({ theme }) => theme.font.p_popTitle}
`;
const PopupItemImage = styled.img`
  width: 9.2rem;
  height: 11.5rem;
`;
const PopupItemName = styled.div``;
const PopupPrice = styled.div``;
const PopupActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  width: 97%;
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

const ProductGrid = styled.div`
  display: grid;
  max-width: 90.5rem;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 13rem));
  grid-template-rows: repeat(auto-fill, minmax(16.25rem, 16.25rem));
  gap: 1rem;
  margin: 2rem;
  margin-left: 11.3rem;
  margin-right: 11rem;
`;

// ReceivedOverlay 컴포넌트 추가
const ReceivedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
const Text = styled.p`
  transform: rotate(-30deg);
  ${({ theme }) => theme.font.m_home_received}
`;
// ProductCard 컴포넌트 수정
const ProductCard = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ShadowOveraly = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%; // 그림자 영역 높이
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  pointer-events: none; // 그림자가 클릭 이벤트에 영향을 주지 않도록 설정
`;

const HeartContainer = styled.div`
  margin-top: 0.5rem;
  text-align: end;
  z-index: 100;
  position: absolute;
  right: 0.5rem;
  bottom: 0.3rem;
  display: ${({ received }) => (received ? 'none' : 'block')};
`;

const Heart = styled.span`
  color: white;
  font-size: 1.5rem;
  margin: 0 0.1rem;
`;

const ClickWish = styled.p`
  ${({ theme }) => theme.font.p_clickwish_eng}
  background-color: white;
  color: #000;
  margin-left: 11rem;
  margin-top: 1.35rem;
  padding: 0.4rem 0.15rem;
  display: inline-block;
  cursor: pointer;
`;

const WishWrapper = styled.div``;
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
  margin-top: 6px;
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
  min-height: 200vh;
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
