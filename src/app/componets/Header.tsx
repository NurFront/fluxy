'use client';

import React, { useEffect, useState } from 'react';
import '../css/header.css';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Posts from './Posts';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { push, replace } = useRouter();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';

    setIsLoggedIn(userLoggedIn);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    replace('/login/signin');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <>
      <div className="header-container">
        <div className="header-title">F L U X Y</div>
        {isLoggedIn ? (
          <div>
            <div className="gmail-account" onClick={toggleProfile}>
              {userEmail.charAt(0).toUpperCase()}
            </div>
            {isProfileOpen && (
              <div className="profile-container">
                <h1 className="gmail-profile">{userEmail}</h1>
                <h1 className="gmail-one">{userEmail.charAt(0).toUpperCase()}</h1>
                <div className="settings-con">
                  <button className="settings-profile" onClick={() => push('/settings')}>
                    <SettingsIcon className="settings-icon" /> Настройки
                  </button>
                </div>
                <div className="logout-con">
                  <LogoutIcon className="logout-icon" />
                  <button onClick={handleLogout} className="logout">Выйти</button>
                </div>
                <div onClick={() => setIsProfileOpen(false)} className="close-con">X</div>
              </div>
            )}
          </div>
        ) : (
          <button className="signin" onClick={() => push('/login/signin')}>Войти</button>
        )}
      </div>
      {isLoggedIn && <Posts userEmail={userEmail} />} 
    </>
  );
};

export default Header;
