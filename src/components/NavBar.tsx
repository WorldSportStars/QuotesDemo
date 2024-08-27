import Link from 'next/link';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    outline: none;
    background-color: #e0e0e0;
  }
`;

export default function NavBar() {
  return (
    <NavBarContainer>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/features">Features</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <NavLink href="/about">About</NavLink>
    </NavBarContainer>
  );
}
