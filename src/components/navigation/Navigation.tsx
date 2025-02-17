import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem;
  background-color: ${({ theme }) => theme.navBg};
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavList>
        <li><NavItem to="/">Home</NavItem></li>
        <li><NavItem to="/portfolio">Portfolio</NavItem></li>
        <li><NavItem to="/blog">Blog</NavItem></li>
      </NavList>
    </Nav>
  );
};

export default Navigation;