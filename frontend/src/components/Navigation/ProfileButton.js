import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const create = (e) => {
    e.preventDefault();
    history.push("./newspot")
  }; 

  const ulClassName = "profile-dropdown" + (showMenu ? " show" : "");


  return (
    <div>
      <div className="right-side">
        <button className="create-button" onClick={create}>
          Create a New Spot
        </button>
          <div className="profile-button-wrapper">
            <button class="profile-button" onClick={openMenu}>
              <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
              {user ? (
                <>
                  <li>{user.username}</li>
                  <li>{user.firstName} {user.lastName}</li>
                  <li>{user.email}</li>
                  <li>
                    <NavLink className="linktext" exact to={`/spots/current`}>
                      My Spots
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="linktext" exact to={`/reviews/current`}>
                      My Reviews
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={logout}>Log Out</button>
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