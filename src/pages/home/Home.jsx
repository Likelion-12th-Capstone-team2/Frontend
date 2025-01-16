import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

import { Iwi } from '@/assets/icons';
import SideBar from '@/common/SideBar';
import TopMenu from '@/common/TopMenu';
import Popup from '@/common/DeletePopup';
import PriceFilter from './components/PriceFilter';
import CategoryFilter from './components/CategoryFilter';
import Products from './components/Products';
import BottomButton from './components/BottomButton';

const Home = () => {
  const { userId = 'guest' } = useParams();
  const loggedInUserId = localStorage.getItem('id');
  const {
    filteredProducts,
    categories,
    settings,
    productToDelete,
    showPopup,
    userType,
    selectedPrice,
    setSelectedPrice,
    setSelectedCategoryId,
    setShowPopup,
    setProductToDelete,
    fetchProductDetails,
    confirmDelete,
  } = useProducts({
    userId,
    loggedInUserId,
  });
  const navigate = useNavigate();
  const ref = useRef(null);

  //state
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    const id = localStorage.getItem('id');
    if (id) {
      navigate(`/home/${id}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.dataset.categoryButton &&
        !event.target.dataset.priceButton
      ) {
        setSelectedPrice(null);
        setSelectedCategoryId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setSelectedPrice, setSelectedCategoryId]);

  return (
    <Wrapper ref={ref}>
      <Container>
        <Line position="left" />
        <Line position="right" />
      </Container>
      <MainContainer
        style={{
          backgroundImage: `url(${settings.backgroundPhoto})`,
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
        <PriceFilter
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        ></PriceFilter>

        <WishWrapper>
          {categories.length === 1 && filteredProducts.length === 0 ? (
            <ClickWish onClick={() => navigate('/mypage')}>
              Click Here and Categorize Your WISH
            </ClickWish>
          ) : (
            <div>
              <CategoryFilter
                categories={categories}
                setSelectedCategoryId={setSelectedCategoryId}
              ></CategoryFilter>

              <MiddleWrapper>
                <Products
                  showDeleteIcons={showDeleteIcons}
                  filteredProducts={filteredProducts}
                  fetchProductDetails={fetchProductDetails}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                ></Products>

                {userType === 'owner' &&
                  userId === localStorage.getItem('id') && (
                    <BottomButton
                      showDeleteIcons={showDeleteIcons}
                      setShowDeleteIcons={setShowDeleteIcons}
                      filteredProducts={filteredProducts}
                    />
                  )}
              </MiddleWrapper>
            </div>
          )}
        </WishWrapper>

        {showPopup && productToDelete && (
          <Popup
            setShowPopup={setShowPopup}
            showPopup={showPopup}
            productToDelete={productToDelete}
            setProductToDelete={setProductToDelete}
            confirmDelete={confirmDelete}
          ></Popup>
        )}
      </MainContainer>
    </Wrapper>
  );
};

export default Home;

const MiddleWrapper = styled.div``;

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

const Title = styled.p`
  ${({ theme }) => theme.font.p_homeTitle_eng}
  background-color:  ${({ theme }) => theme.color.yellow};
  color: black;
  padding: 0 0.5rem;

  display: inline-block;
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
  background-position: top left;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: auto;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;

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
