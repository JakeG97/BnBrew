import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navigation-container">
      <div>
        <NavLink exact to="/">
          <img className="logo" src="https://i.imgur.com/Vh1OjLg.png" alt="BnBrew" />
          <div>BnBrew</div>
        </NavLink>
      </div>
      {isLoaded && <ProfileButton user={sessionUser} />}
    </ul>
  );
}

export default Navigation;