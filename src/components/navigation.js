import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import Logo from "./loglogin.png";
import "./nav.css";

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
      <>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway|Open+Sans"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <nav class="navbar navbar-default navbar-expand-lg navbar-light">
          <div class="navbar-header d-flex col">
            <a class="navbar-brand" href={"/"}>
              My<b>Sport</b>
            </a>
            <button
              type="button"
              data-target="#navbarCollapse"
              data-toggle="collapse"
              class="navbar-toggle navbar-toggler ml-auto"
            >
              <span class="navbar-toggler-icon"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div
            id="navbarCollapse"
            class="collapse navbar-collapse justify-content-start"
          >
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <NavLink to="/login" tag={RRNavLink}>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else if (token && admin === "yes") {
    return (
      <>
        <nav class="navbar navbar-default navbar-expand-lg navbar-light">
          <div class="navbar-header d-flex col">
            <a class="navbar-brand" href={"/"}>
              My<b>Sport</b>
            </a>
            <button
              type="button"
              data-target="#navbarCollapse"
              data-toggle="collapse"
              class="navbar-toggle navbar-toggler ml-auto"
            >
              <span class="navbar-toggler-icon"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div
            id="navbarCollapse"
            class="collapse navbar-collapse justify-content-start"
          >
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <NavLink to="/allartikel" tag={RRNavLink}>
                  List Artikel
                </NavLink>
              </li>
            </ul>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <NavLink to="/listkomentar" tag={RRNavLink}>
                  List Komentar
                </NavLink>
              </li>
            </ul>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <NavLink to="/listuser" tag={RRNavLink}>
                  List User
                </NavLink>
              </li>
            </ul>

            <ul class="nav navbar-nav">
              <li class="nav-item">
                <NavLink to="/logout" tag={RRNavLink}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else if (token && admin === "no") {
    return (
      <nav class="navbar navbar-default navbar-expand-lg navbar-light">
        <div class="navbar-header d-flex col">
          <a class="navbar-brand" href={"/"}>
            My<b>Sport</b>
          </a>
          <button
            type="button"
            data-target="#navbarCollapse"
            data-toggle="collapse"
            class="navbar-toggle navbar-toggler ml-auto"
          >
            <span class="navbar-toggler-icon"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div
          id="navbarCollapse"
          class="collapse navbar-collapse justify-content-start"
        >
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <NavLink to="/allartikel" tag={RRNavLink}>
                Read Artikel
              </NavLink>
            </li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <NavLink to="/listartikelid" tag={RRNavLink}>
                My Artikel
              </NavLink>
            </li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <NavLink to="/logout" tag={RRNavLink}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navigation;
