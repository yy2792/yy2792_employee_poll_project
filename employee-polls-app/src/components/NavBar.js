import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/userAuth";

function NavBar({ dispatch, authedUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <ul className="navItems">
        <Link to="/" className="navItem">
          <li id="dashboard">Dashboard</li>
        </Link>
        <Link to="/leaderboard" className="navItem">
          <li id="leaderboard">Leaderboard</li>
        </Link>
        <Link to="/add" className="navItem">
          <li id="createPoll">New</li>
        </Link>
      </ul>
      <div className="logout">
        {authedUser && (
          <>
            <img
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "30%",
                marginRight: "10px",
              }}
              src={authedUser.avatarURL}
              alt=""
            />
            <p>{authedUser.name}</p>
          </>
        )}
        <ul className="nav-links">
          <li id="logout" className="logoutBtn" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ userAuth, users }) => ({
  authedUser: users[userAuth],
});

export default connect(mapStateToProps)(NavBar);
