import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-link" to="/rental">
            Rental
          </NavLink>
          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>
        </ul>

        {/* only render the login and register links when there's no user logged in */}
        {!user && (
          <ul className="navbar-nav ml-auto">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>

            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </ul>
        )}

        {user && (
          <ul className="navbar-nav ml-auto">
            <NavLink className="nav-link" to="/profile">
              {user.name}
            </NavLink>

            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
