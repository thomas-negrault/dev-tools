import { NavLink } from "react-router-dom";
import React from "react";
import getLinksConfig from "../../config/tools";

export default function VerticalMenu() {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>
          <NavLink to="/" className="pure-menu-heading">
            DevTools.best
          </NavLink>
        </h3>
      </div>
      <ul className="list-unstyled components">
        {getLinksConfig().map(link => (
          <li key={`${link.path}-${link.label}`}>
            <NavLink
              to={link.path}
              className="menu-link"
              activeClassName={"active"}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
