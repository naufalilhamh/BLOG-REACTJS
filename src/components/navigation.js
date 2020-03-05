import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import Logo from "./logbol.png";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const token = sessionStorage.getItem("Token");
  const admin = sessionStorage.getItem("Admin");

  if (!token) {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href={"/"}>
          <img src={Logo} alt="..." width="50px" height="50px" /> Sport
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/login" tag={RRNavLink}>
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token && admin === "yes") {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href={"/"}>BLOG</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/allartikel" tag={RRNavLink}>
                List Artikel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/listkomentar" tag={RRNavLink}>
                List Komentar
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/listuser" tag={RRNavLink}>
                List User
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/logout" tag={RRNavLink}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token && admin === "no") {
    return (
      <Navbar color="light" light expand="sm">
        <NavbarBrand href={"/"}>BLOG</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/allartikel" tag={RRNavLink}>
                Read Artikel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/listartikelid" tag={RRNavLink}>
                My Artikel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" tag={RRNavLink}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
};

export default Navigation;
