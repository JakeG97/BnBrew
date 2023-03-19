import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const user = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const create = (e) => {
    e.preventDefault();
    history.push("./newspot")
  }; 

  const ulClassName = "profile-dropdown" + (showMenu ? " show" : "");

  return (
    <div className="right-side">
      <div className="button-wrapper">
        {user && (
          <button className="create-button" onClick={create}>
            Create a New Spot
          </button>
        )}
        <div className="profile-button-wrapper">
          <button className="menu-icon" onClick={openMenu}>
            <span>
              <div className="fa-solid fa-bars" onClick={openMenu}></div>
              <div className="fa-solid fa-user" onClick={openMenu}></div>
            </span>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <li>Hello, {user.firstName}</li>
                <li id="email-line">{user.email}</li>
                <li>
                  <NavLink className="linktext" exact to={`/spots/current`}>
                    Manage Spots
                  </NavLink>
                </li>
                <li id="manage-line">
                  <NavLink className="linktext" exact to={`/reviews/current`}>
                    Manage Reviews
                  </NavLink>
                </li>
                <li>
                  <button id="logout-button" onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
