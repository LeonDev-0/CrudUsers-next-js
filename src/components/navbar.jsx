"use client"
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const NavContainer = styled.div`
  position: relative;
  z-index: 1000; // Asegura que el navbar esté por encima de otros elementos
`;

const Nav = styled.nav`
  background-color: #1c104b;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.525rem;
   `;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    background-color: #0e0531;
    z-index: 1000; // Asegura que el menú esté por encima del contenido
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  &:hover{
    color:red;
  }
  
  @media (max-width: 767px) {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerLine = styled.span`
  background-color: white;
  height: 0.25rem;
  width: 2rem;
  margin-bottom: 0.25rem;
  transition:  all 0.5s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ isOpen, index }) => {
    if (isOpen) {
      if (index === 0) return 'transform: rotate(45deg) translate(5px, 5px);';
      if (index === 1) return 'opacity: 0;';
      if (index === 2) return 'transform: rotate(-45deg) translate(7px, -6px);';
    }
    return '';
  }}
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <NavContainer>
      <Nav>
        <Logo>SandroApp</Logo>
        <MenuItems isOpen={isOpen}>
          <MenuItem href={"/"} onClick={handleLinkClick}>INICIO</MenuItem>
          <MenuItem href={'/users'} onClick={handleLinkClick}>USUARIOS</MenuItem>
          <MenuItem href={"/products"} onClick={handleLinkClick}>PRODUCTOS</MenuItem>
          <MenuItem href={'/catalogo'} onClick={handleLinkClick}>CATALOGO</MenuItem>
          <MenuItem href={'/zandro'} onClick={handleLinkClick}>SANDRO AMA A CRISTINA</MenuItem>
        </MenuItems>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <HamburgerLine isOpen={isOpen} index={0} />
          <HamburgerLine isOpen={isOpen} index={1} />
          <HamburgerLine isOpen={isOpen} index={2} />
        </Hamburger>
      </Nav>
    </NavContainer>
  );
};

export default Navbar;