import RustLogo from './rust.svg'
import styled from "styled-components";
import {Link} from "react-router-dom";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: black;
  height: 70px;
  padding: 20px 100px 20px 100px;

`

const NavWrapper = styled.nav`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 50px;
  width: 900px;
  
  a {
    color: white;
    font-weight: 700;
    height: 1em;

    font-size: 32px;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
`
function Header() {
    return <HeaderWrapper>
        <img src={RustLogo} alt="rust-logo"/>
        <NavWrapper>
            <Link to="/">Магазин</Link>
            <Link to="/basket">Корзина</Link>
            <Link to="/profile">Профиль</Link>
        </NavWrapper>
    </HeaderWrapper>
    // return <h1>WTF</h1>
}

export default Header;