import styled from 'styled-components';
import backgroundEg from '@/assets/backgroundEg.png';
import dummyProductImage from '@/assets/dummyitemImage.png';
import { Delete } from '@/assets/icons';
import { useState } from 'react';

const dummyProducts = [
  {
    id: 1,
    name: 'Bag 1',
    price: 25000,
    image: dummyProductImage,
    received: true,
    hearts: 3,
  },
  {
    id: 2,
    name: 'Bag 2',
    price: 40000,
    image: dummyProductImage,
    received: false,
    hearts: 5,
  },
  {
    id: 3,
    name: 'Bag 3',
    price: 80000,
    image: dummyProductImage,
    received: false,
    hearts: 2,
  },
  {
    id: 4,
    name: 'Bag 1',
    price: 25000,
    image: dummyProductImage,
    received: true,
    hearts: 4,
  },
  {
    id: 5,
    name: 'Bag 2',
    price: 40000,
    image: dummyProductImage,
    received: false,
    hearts: 1,
  },
  {
    id: 6,
    name: 'Bag 3',
    price: 80000,
    image: dummyProductImage,
    received: false,
    hearts: 0,
  },
];

const SignIn = () => {
  const [products, setProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(true); // 처음에는 메시지 표시
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const addProduct = () => {
    setProducts(dummyProducts); // 상품 더미 데이터 추가
    setShowMessage(false); // 메시지 숨김
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== productToDelete.id),
    );
    setProductToDelete(null);
    setShowPopup(false);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowPopup(false);
  };

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
      <CatagoryWrapper></CatagoryWrapper>
      <WishWrapper>
        {showMessage && (
          <ClickWish onClick={addProduct}>
            Click Here and Categorize Your WISH
          </ClickWish>
        )}
      </WishWrapper>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} received={product.received}>
            <ProductImage src={product.image} alt={product.name} />
            {product.received && (
              <ReceivedOverlay>
                <Text>Received</Text>
              </ReceivedOverlay>
            )}
            <Delete
              style={{
                position: 'absolute',
                top: '0.3rem',
                right: '0.3rem',
                zIndex: 100,
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteClick(product)}
            ></Delete>
            {!product.received && <ShadowOveraly></ShadowOveraly>}
            <HeartContainer received={product.received}>
              {Array(product.hearts)
                .fill('♥')
                .map((heart, index) => (
                  <Heart key={index}>{heart}</Heart>
                ))}
            </HeartContainer>
          </ProductCard>
        ))}
      </ProductGrid>
      {showPopup && productToDelete && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>Do you wanna delete this?</PopupText>
            <PopupItemImage
              src={productToDelete.image}
              alt={productToDelete.name}
            ></PopupItemImage>
            <PopupItemName>{productToDelete.name}</PopupItemName>
            <PopupPrice>
              Price: {productToDelete.price.toLocaleString()} 원
            </PopupPrice>
            <PopupActions>
              <PopupButton onClick={cancelDelete}>No</PopupButton>
              <PopupButton onClick={confirmDelete}>Yes</PopupButton>
            </PopupActions>
          </PopupContainer>
        </PopupOverlay>
      )}
      ;
    </Wrapper>
  );
};

export default SignIn;

const CatagoryWrapper = styled.div``;

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
