import { NavLink } from "react-router-dom";
import React from "react";
import getLinksConfig from "../../config/tools";

export default function VerticalMenu() {
  return (
    <div id="menu">
      <div className="pure-menu custom-restricted-width">
        <NavLink to="/" className="pure-menu-heading">
          DevTools.best 🛠
        </NavLink>
        <ul className="pure-menu-list">
          {getLinksConfig().map(link => (
            <li className="pure-menu-item" key={link.path}>
              <NavLink
                to={link.path}
                className="pure-menu-link"
                activeClassName={"pure-menu-selected"}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
