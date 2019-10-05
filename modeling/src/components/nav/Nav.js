import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { routes } from "./Routes";
import logo from "../../assets/img/smm_design_icon-05.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";

const Nav = () => {
  const [state, setState] = useState({ openmenu: true });
  const mediaRule = window.matchMedia("(max-width: 760px)");
  mediaRule.onchange = _ => setState({ openmenu: true });
  return (
    <nav className="myNavBar">
      <Link to="/">
        <img alt="logo" src={logo} style={{ height: "64px" }} />
      </Link>
      <ul className={state.openmenu ? "show" : "hidden"}>
        {routes.map(el =>
          el.maneuItem ? (
            <li key={el.route}>
              <NavLink to={el.route}>{el.text}</NavLink>
            </li>
          ) : null
        )}
      </ul>
      <div
        style={{
          position: "fixed",
          top: "1%",
          right: "2%",
          cursor: "pointer",
          display: "none"
        }}
        className="menuBars"
        onClick={_ => setState({ openmenu: !state.openmenu })}
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: "32px", color: "#ffffffdd" }}
        />
      </div>
    </nav>
  );
};

export default Nav;
