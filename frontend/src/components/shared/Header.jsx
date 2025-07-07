import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

// Container and Layout
const Container = styled.div`
  background-color: #111b22;
  min-height: 100vh;
  font-family: "Space Grotesk", "Noto Sans", sans-serif;
  color: #fff;
`;

const LayoutContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
`;

// Header Components
const HeaderContainer = styled.header`
  border-bottom: 1px solid #243947;
  padding: 1rem 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
`;

const LogoText = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

// Price
const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ff88;
`;

// AddToCartButton
const AddToCartButton = styled.button`
  background: #00ff88;
  color: #111b22;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background: #14a866;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <StyledNavLink
      to={to}
      className={isActive ? 'active' : ''}
      {...props}
    >
      {children}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background-color: #243947;
    color: #00ff88;
  }

  &.active {
    background-color: #00ff88;
    color: #111b22;
  }
`;

const CartButton = styled.button`
  background-color: #243947;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  cursor: pointer;
`;

const CartIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

// Search Bar
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #243947;
  border-radius: 4px;
  background-color: #243947;
  color: #fff;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #00ff00;
  }
`;

const SearchIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
`;

// Filter Buttons
const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const FilterButton = styled.button`
  background-color: #243947;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    background-color: #354e61;
  }
`;

// Category Buttons
const CategoryButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const CategoryButton = styled.button`
  background-color: #243947;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    background-color: #354e61;
  }
`;

const CategoryText = styled.span`
  margin-right: 0.5rem;
`;

// Back Button
const BackIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

const BackButton = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
`;

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
`;

const Spinner = styled.div`
  border: 2px solid #2196f3;
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Error components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

// Grid components
const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const EventCard = styled.div`
  background-color: #243947;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const EventInfo = styled.div`
  padding: 1rem;
`;

const EventTitle = styled.p`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
`;

const EventDetails = styled.p`
  font-size: 0.875rem;
  color: #93b3c8;
  margin: 0.25rem 0;
`;

// Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled.a`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  background-color: #243947;
  
  &:hover {
    background-color: #354e61;
  }
  
  &.active {
    background-color: #00ff00;
    color: #111b22;
  }
`;

const AppHeader = ({ children }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <LayoutContainer>
        <HeaderContainer>
          <Logo>
            <LogoIcon viewBox="0 0 256 256">
              <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" fill="currentColor"/>
            </LogoIcon>
            <LogoText>EventMerch</LogoText>
          </Logo>
          <NavLinks>
            <NavLink to="/" as={Link}>Home</NavLink>
            <NavLink to="/events" as={Link}>Events</NavLink>
            <NavLink to="/merchandise" as={Link}>Merchandise</NavLink>
            <NavLink to="/tickets" as={Link}>My Tickets</NavLink>
          </NavLinks>
          <CartButton>
            <CartIcon viewBox="0 0 256 256">
              <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" fill="currentColor"/>
            </CartIcon>
          </CartButton>
          {children}
        </HeaderContainer>
      </LayoutContainer>
    </Container>
  );
};

export {
  LayoutContainer,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterButtons,
  FilterButton,
  CategoryButtons,
  CategoryButton,
  CategoryText,
  BackIcon,
  BackButton,
  LoadingContainer,
  LoadingSpinner,
  Spinner,
  ErrorContainer,
  ErrorText,
  Pagination,
  PageButton,
  EventGrid,
  EventCard,
  EventImage,
  EventInfo,
  EventTitle,
  EventDetails,
  StyledNavLink as NavLink,
  Price,
  AddToCartButton,
  Container,
  HeaderContainer,
  AppHeader
};

export default AppHeader;
