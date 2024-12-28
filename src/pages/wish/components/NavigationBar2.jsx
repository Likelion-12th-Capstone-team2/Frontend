// NavigationBar.js
import React from 'react';
import styled from 'styled-components';
import hamburger from '@/assets/hamburger.svg';
import CloseIcon from '@/assets/closeIcon.svg';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ menuOpen, toggleMenu, handleLogout, userType }) => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Hamburger onClick={toggleMenu}>
        <img src={hamburger} alt="Menu" />
      </Hamburger>

      <SideMenu open={menuOpen}>
        <CloseButton onClick={toggleMenu}>
          <img src={CloseIcon} alt="Close Menu" />
        </CloseButton>
        <MenuItems>
          {userType === 'guest' ? (
            <MenuItem onClick={() => navigate('/')}>Log In</MenuItem>
          ) : (
            <>
              <MenuItem>Ding!</MenuItem>
              <MenuItem>Setting</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </>
          )}
        </MenuItems>
      </SideMenu>

      {userType === 'guest' ? (
        <NavBtn onClick={() => navigate('/')}>Log In</NavBtn>
      ) : (
        <>
          <NavBtn>Ding!</NavBtn>
          <NavBtn>Setting</NavBtn>
          <NavBtn onClick={handleLogout}>Log out</NavBtn>
        </>
      )}
    </NavContainer>
  );
};

export default NavigationBar;

const NavBtn = styled.div`
  border: 1px solid #000;
  background: #fff;
  ${({ theme }) => theme.font.p_btn}
  color: #000;
  padding: 0.25rem 1.125rem;
  cursor: pointer;
  @media (max-width: 48rem) {
    display: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.125rem;

  align-items: center;

  @media (max-width: 60rem) {
    margin-right: 5rem;
  }
  @media (max-width: 48rem) {
    margin-top: 1rem;
    margin-right: 3rem;
    display: flex;
    width: 95%;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  width: 30px; /* 버튼 크기 */
  height: 30px; /* 버튼 크기 */
  margin-top: 5px;

  @media (max-width: 48rem) {
    display: block;
  }
`;
const SideMenu = styled.div`
  display: none;
  @media (max-width: 48rem) {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: orange;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  align-self: flex-end;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 0.25rem 1rem;
  margin-left: 7.5rem;
  margin-top: 1rem;
`;

const MenuItem = styled.li`
  margin-bottom: 1.5rem;

  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
  cursor: pointer;
  background-color: white;
  text-align: center;
  ${({ theme }) => theme.font.m_btn}

  &:hover {
    background-color: white;
    color: black;
  }
`;
