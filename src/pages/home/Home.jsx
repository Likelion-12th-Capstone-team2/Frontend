import styled from 'styled-components';
import { Delete } from '@/assets/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '@/common/SideBar';
import TopMenu from '@/common/TopMenu';
import Popup from './components/Popup';
import { useParams } from 'react-router-dom';
import { Iwi } from '@/assets/icons';
import HeartFull from '@/assets/Frame 336.svg';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품
  const [showMessage, setShowMessage] = useState(true); // 처음에는 메시지 표시
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 선택된 카테고리 상태 추가
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 선택된 카테고리 ID 추가
  const [selectedPrice, setSelectedPrice] = useState(null); // 선택된 가격 상태 추가
  const [showDeleteIcons, setShowDeleteIcons] = useState(false); // <Delete> 아이콘 표시 상태
  const [userType, setUserType] = useState(''); // user type state 추가
  const [settings, setSettings] = useState({
    name: '',
    backgroundPhoto: '',
  });
  const [categories, setCategories] = useState([{ name: 'All', id: null }]); // 카테고리 상태
  const [menuOpen, setMenuOpen] = useState(false);

  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem('id');
  const wrapperRef = useRef(null); // Wrapper 요소 참조
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleLogoClick = () => {
    const id = localStorage.getItem('id');
    if (id) {
      navigate(`/home/${id}`);
    }
  };

  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    setCategoryCount(categories.length);
  }, [categories]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchDataWrapper = async () => {
      if (!token) {
        setUserType('guest');
        if (!userId || userId === 'guest') {
          navigate(`/home/guest`);
        } else {
          if (userId) await fetchData(userId); // userId가 null이 아닐 때만 호출
        }
      } else {
        if (!userId) {
          navigate(`/home/${loggedInUserId}`);
        } else if (userId === loggedInUserId) {
          setUserType('owner');
          if (loggedInUserId) await fetchData(loggedInUserId); // loggedInUserId 확인
        } else {
          setUserType('viewer');
          if (userId) await fetchData(userId); // userId 확인
        }
      }
    };

    fetchDataWrapper();
  }, [userId, navigate, selectedPrice, selectedCategoryId]);

  const handleClickOutside = (event) => {
    const priceButtons = document.querySelectorAll('[data-price-button]');
    const categoryButtons = document.querySelectorAll('[data-category-button]');

    const isPriceButton = Array.from(priceButtons).some((button) =>
      button.contains(event.target),
    );
    const isCategoryButton = Array.from(categoryButtons).some((button) =>
      button.contains(event.target),
    );

    if (!isPriceButton && !isCategoryButton) {
      // 버튼 외의 영역을 클릭한 경우 선택된 필터 해제
      setSelectedPrice(null);
      setSelectedCategory('All');
      setSelectedCategoryId(null);
    }
  };

  useEffect(() => {
    // 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fetchData = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      // Query parameters 추가
      const params = new URLSearchParams();
      if (selectedPrice !== null && selectedPrice !== undefined) {
        params.append('price', selectedPrice);
      }
      if (selectedCategoryId !== null && selectedCategoryId !== undefined) {
        params.append('category', selectedCategoryId);
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/wish/${userId || 'guest'}/?${params.toString()}`, // 기본값 처리
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      const data = response.data;

      setSettings({
        name: data.setting?.name,
        backgroundPhoto: data.setting?.background_photo || '',
        color: data.setting?.color || '#fff',
        typography: data.setting?.typography || 'Arial',
      });

      const categoryList = data.catagory
        ? data.catagory.map((cat) => ({
            name: cat.category,
            id: cat.id,
          }))
        : [];
      setCategories([{ name: 'All', id: null }, ...categoryList]);

      setProducts((data.wish_items || []).sort((a, b) => b.heart - a.heart)); // 큰 값에서 작은 값 순으로 정렬
      setFilteredProducts(
        (data.wish_items || []).sort((a, b) => b.heart - a.heart),
      );

      setShowMessage(data.wish_items?.length === 0);
    } catch (error) {
      // 404 에러와 일반적인 에러를 분리하여 처리
      if (error.response?.status === 404) {
        console.error('Resource not found:', error);
        alert('Requested resource not found. Please check the URL or user ID.');
      } else {
        console.error('Failed to fetch data:', error);
        alert('Failed to load user information. Please try again later.');
      }
    }
  };
  const selectCategory = async (category, categoryId) => {
    setSelectedCategory(category);
    setSelectedCategoryId(categoryId);
    setLoading(true); // 카테고리 변경 시 로딩 시작

    try {
      // 카테고리 필터링 작업을 비동기적으로 처리
      if (category === 'All') {
        setFilteredProducts(products); // 전체 상품으로 필터링
      } else {
        const filtered = products.filter(
          (product) => product.category_id === categoryId,
        );
        setFilteredProducts(filtered);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false); // 필터링 작업이 끝난 후 로딩 끝
    }
  };

  const selectPrice = (price) => {
    setSelectedPrice(price);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 인증 토큰 삭제
    localStorage.removeItem('id'); // 사용자 ID 삭제
    navigate('/'); // 로그인 페이지로 이동
    alert('Complete Logout.');
  };

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
      setFilteredProducts((prev) =>
        prev.filter((item) => item.id !== productToDelete.id),
      );
      setProductToDelete(null); // 삭제 대상 초기화
      setShowPopup(false); // 팝업 닫기
      alert('The product has been successfully deleted.');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete the product.');
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
      alert('Failed to fetch product information.');
    }
  };

  const handleDeleteClick = (productId) => {
    fetchProductDetails(productId); // 버튼 클릭 시 상품 상세 정보 요청
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowPopup(false);
  };

  const toggleDeleteMode = () => {
    setShowDeleteIcons((prev) => !prev); // 삭제 모드 토글
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Container>
        <Line position="left" />
        <Line position="right" />
      </Container>
      <MainContainer
        style={{
          backgroundImage: `url(${settings.backgroundPhoto})`, // 중괄호 안에 `${}`로 수정
        }}
      >
        <Container>
          <Line position="top" />
          <Line position="bottom" />
        </Container>
        <>
          <StyledIwi onClick={handleLogoClick} />{' '}
          <TopMenu
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            handleLogout={handleLogout}
            userType={userType}
            style={{
              position: 'absolute',
              top: '2.34rem',
              right: '1.1rem',
            }}
            loginUser={loggedInUserId}
          />
          <SideBar
            handleLogout={handleLogout}
            userType={userType}
            loginUser={loggedInUserId}
          />
        </>

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
          <Price
            data-price-button
            selected={selectedPrice === 0}
            onClick={() => selectPrice(0)}
          >
            ~30,000
          </Price>
          <Price
            data-price-button
            selected={selectedPrice === 30000}
            onClick={() => selectPrice(30000)}
          >
            30,000~50,000
          </Price>
          <Price
            data-price-button
            selected={selectedPrice === 50000}
            onClick={() => selectPrice(50000)}
          >
            50,000~100,000
          </Price>
          <Price
            data-price-button
            selected={selectedPrice === 100000}
            onClick={() => selectPrice(100000)}
          >
            100,000~
          </Price>
        </PriceWrapper>
        <WishWrapper>
          {categories.length === 1 && filteredProducts.length === 0 ? (
            <ClickWish onClick={() => navigate('/mypage')}>
              Click Here and Categorize Your WISH
            </ClickWish>
          ) : (
            <div>
              <CatagoryContainer categoryCount={categoryCount}>
                <CategoryWrapper>
                  {categories.map((category) => (
                    <CategoryButton
                      key={category.id || 'all'}
                      data-category-button
                      selected={selectedCategory === category.name}
                      onClick={() => selectCategory(category.name, category.id)}
                    >
                      {category.name}
                    </CategoryButton>
                  ))}
                </CategoryWrapper>
              </CatagoryContainer>

              <MiddleWrapper>
                <ProductGrid>
                  {loading ? (
                    <p>Loading...</p>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} style={{ position: 'relative' }}>
                        <ProductCard
                          received={product.is_sended}
                          onClick={() => {
                            if (showDeleteIcons) {
                              handleDeleteClick(product.id);
                            } else {
                              navigate('/wishDetail', {
                                state: { itemId: product.id },
                              });
                            }
                          }}
                        >
                          <ProductImage
                            src={product.item_image}
                            alt={`Product ${product.id}`}
                          />
                          {product.is_sended ? (
                            <ReceivedOverlay>
                              <Text>Received</Text>
                            </ReceivedOverlay>
                          ) : (
                            <ShadowOverlay />
                          )}
                          <HeartContainer received={product.is_sended}>
                            {Array(product.heart)
                              .fill(null)
                              .map((_, index) => (
                                <Heart key={index}>
                                  <img
                                    src={HeartFull}
                                    style={{
                                      width: '1.5rem',
                                      height: '1.5rem',
                                    }}
                                    alt="Heart Icon"
                                  />
                                </Heart>
                              ))}
                          </HeartContainer>
                        </ProductCard>
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
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </ProductGrid>

                {userType === 'owner' &&
                  userId === localStorage.getItem('id') && (
                    <BottomWrapper>
                      {filteredProducts.length === 0 ? (
                        <button onClick={() => navigate('/wishRegister')}>
                          Add
                        </button>
                      ) : (
                        <>
                          <button onClick={toggleDeleteMode}>
                            {showDeleteIcons ? 'Done' : 'Delete'}
                          </button>
                          <button onClick={() => navigate('/wishRegister')}>
                            Add
                          </button>
                        </>
                      )}
                    </BottomWrapper>
                  )}
              </MiddleWrapper>
            </div>
          )}
        </WishWrapper>

        {showPopup && productToDelete && (
          <Popup
            productToDelete={productToDelete}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        )}
      </MainContainer>
    </Wrapper>
  );
};

export default Home;

const MiddleWrapper = styled.div``;
const BottomWrapper = styled.div`
  position: absolute;
  right: 12rem;
  display: flex;
  padding-bottom: 10rem;
  > button {
    display: flex;
    padding: 0.25rem 1.125rem;
    justify-content: center;
    align-items: center;
    gap: 0.375rem;
    ${({ theme }) => theme.font.p_btn}
  }

  > button:nth-child(1) {
    color: white;
    background-color: black;
    margin-right: 1rem;
  }
  > button:nth-child(2) {
    color: black;
    background-color: #ffa100;
    border: none;
  }
  @media (max-width: 60rem) {
    right: 8rem;
  }
  @media (max-width: 48rem) {
    right: 2.3rem;
  }
`;

const CatagoryContainer = styled.div`
  width: 79%;
  min-height: 13rem;
  position: relative; /* 자식 요소의 위치를 제한 */
  display: flex;
  align-items: center;
  margin-left: 8rem;
  @media (max-width: 60rem) {
    margin-left: 2.5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 0rem;
  }
  @media (max-width: 36rem) {
    min-height: ${({ categoryCount }) =>
      categoryCount <= 4 ? '13rem' : '23rem'}; // 4개 이하일 때만 높이 줄이기
  }
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem;
  grid-template-rows: auto;
  row-gap: 8rem;
  position: absolute;

  white-space: nowrap; /* 요소가 한 줄로 유지되도록 설정 */
  @media (max-width: 60rem) {
    grid-template-columns: 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem;
  }
  @media (max-width: 36rem) {
    grid-template-columns: 4rem 4rem 4rem 4rem;
  }
`;

const CategoryButton = styled.p`
  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
  padding: 0.2rem 0.525rem;
  background-color: ${({ selected }) => (selected ? 'white' : 'black')};
  color: ${({ selected }) => (selected ? 'black' : 'white')};
  cursor: pointer;
  border: none;
  width: 10rem;
  border-color: ${({ selected }) => (selected ? 'black' : 'white')};
  border: solid 1px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  ${({ theme }) => theme.font.p_category}
  transform: rotate(-90deg); /* 90도 회전 추가 */

  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    background-color: white;
    color: black;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  max-width: 90.5rem;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 13rem));
  grid-auto-rows: 16.25rem; /* 행 높이를 고정 */
  gap: 1rem;
  margin: 2rem;
  margin-left: 11.3rem;
  margin-right: 11rem;
  @media (max-width: 60rem) {
    margin-left: 5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 3.4rem;
  }
`;

// ReceivedOverlay 컴포넌트 추가
const StyledIwi = styled(Iwi)`
  width: 3.875rem;
  position: absolute;
  top: 1.69rem;
  left: 9.75rem;

  cursor: pointer;

  div[class*='AuthLayout'] ~ & {
    left: 3.75rem;
  }

  ${({ theme }) => theme.mobile} {
    top: 2.3rem;
    left: 8.14%;
  }
`;
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
  width: 100%;
  height: 100%;
  overflow: hidden; /* 컨테이너를 벗어난 이미지를 숨김 */
  display: flex; /* 필요하면 이미지 정렬용 */
  align-items: center; /* 필요하면 이미지 정렬용 */
  justify-content: center; /* 필요하면 이미지 정렬용 */
  cursor: pointer;
`;

const ProductImage = styled.img`
  position: absolute; /* 부모 요소를 기준으로 위치 설정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지하며 컨테이너를 채움 */
`;

const ShadowOverlay = styled.div`
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

const Heart = styled.span``;

const ClickWish = styled.p`
  ${({ theme }) => theme.font.p_clickwish_eng}
  background-color: white;
  color: #000;
  margin-left: 11rem;
  margin-top: 1.35rem;
  padding: 0.4rem 0.15rem;
  display: inline-block;
  margin-right: 4rem;
  cursor: pointer;
  @media (max-width: 60rem) {
    margin-left: 6rem;
  }
  @media (max-width: 48rem) {
    margin-left: 3.5rem;
  }
`;

const WishWrapper = styled.div``;

const Price = styled.div`
  ${({ theme }) => theme.font.p_numBtn}
  border-radius: 3.125rem;
  border: 1px solid #000;
  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
  background-color: ${({ selected }) => (selected ? 'white' : 'black')};
  color: ${({ selected }) => (selected ? 'black' : 'white')};
  border-color: ${({ selected }) => (selected ? 'black' : 'white')};
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
  @media (max-width: 60rem) {
    margin-left: 5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 3rem;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.font.p_homeTitle_eng}
  background-color:  ${({ theme }) => theme.color.yellow};
  color: black;
  padding: 0 0.5rem;

  display: inline-block; /* 글씨 영역만큼만 배경 색상을 적용 */
`;
const TitleWrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  margin-left: 9.5rem;
  margin-top: 6.9rem;
  @media (max-width: 60rem) {
    flex-direction: column;
    gap: 1rem;
    margin-left: 5rem;
    margin-top: 7.2rem;
  }
  @media (max-width: 48rem) {
    flex-direction: column;
    gap: 1rem;
    margin-left: 2.5rem;
    margin-top: 7.2rem;
  }
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
    min-height: 100vh;
  `}

  ${({ position }) =>
    position === 'right' &&
    `
    top: 0rem; 
    bottom: 0rem; 
    right: 8.75rem; 
    width: 1px;
    height: 100vh;
  `}

  /* 반응형 미디어 쿼리 */
  @media (max-width: 60rem) {
    ${({ position }) =>
      position === 'left' &&
      `
      left: 4rem; /* 화면이 작아질 때 줄어든 값 */
    `}

    ${({ position }) =>
      position === 'right' &&
      `
      right: 4rem; /* 화면이 작아질 때 줄어든 값 */
    `}
      ${({ position }) =>
      position === 'bottom' &&
      `
    top: 16.2rem; 
    left: 0rem; 
    right: 0rem; 
    height: 1px;
  `}
  }

  @media (max-width: 48rem) {
    ${({ position }) =>
      position === 'left' &&
      `
      left: 1.5rem; /* 화면이 작아질 때 줄어든 값 */
    `}

    ${({ position }) =>
      position === 'right' &&
      `
      right: 1.5rem; /* 화면이 작아질 때 줄어든 값 */
    `}
  }
`;

const Container = styled.div``;
const MainContainer = styled.div`
  background-repeat: repeat;
  background-size: 320px 350px;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: overlay;
  background-position: top left; /* 이미지가 반복되도록 시작점 설정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: auto;
  min-height: 100vh; /* 화면 전체 높이를 기본값으로 설정 */
  overflow-y: scroll; /* 넘친 요소를 숨김 */
  overflow-x: hidden;
  /* Firefox, IE, Edge, Chrome, Safari 모두에서 안 되게*/
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  display: inline-block;
`;
