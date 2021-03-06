import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {BtnContainer} from "./Button";
import logoApp from "../logo.svg";

export default class Navbar extends Component {
  render() {
    return (
      <NavbarWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon Creative
        Commons (Attribution 3.0 Unported);
        https://www.iconfinder.com/Makoto_msk */}

        <Link to="/">
          <img src={logoApp} alt="logo" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Phones
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <BtnContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </BtnContainer>
        </Link>
      </NavbarWrapper>
    );
  }
}

const NavbarWrapper = styled.nav`
  background: var(--defaulPink);
  .nav-link {
    color: var(--defaultWhite)!important;
    text-transform: capitalize;
    font-size: 1.5rem;
  }
`;