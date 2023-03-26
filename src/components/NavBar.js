import React from "react";
import "./NavBar.css";
import avatar from "./avatar.png";
import refresh from "./refresh.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <div className="avatar-container">
        <img src={refresh} alt="Avatar" className="avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
