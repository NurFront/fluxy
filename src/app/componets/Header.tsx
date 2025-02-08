'use client'

import React, { useEffect, useState } from 'react'
import '../css/header.css'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')

    if (userLoggedIn === 'true' && email) {
      setIsLoggedIn(true)
      setUserEmail(email)
    }
  }, [])

  const { push } = useRouter()

  const navSign = () => {
    push('/login/signin')
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setUserEmail("")
    setIsProfileOpen(false)
  }

  const toggleProfileMenu = () => {
    setIsProfileOpen(prevState => !prevState)
  }

  const closeProfileMenu = () => {
    setIsProfileOpen(false)
  }

  return (
    <div className='header-container'>
      <div className='header-title'>F l u x</div>
      {isLoggedIn ? (
        <div>
          <div className='gmail-account' onClick={toggleProfileMenu}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
          {isProfileOpen && (
            <div className='profile-container'>
              <button onClick={handleLogout} className='logout'>Выйти</button>
              <div onClick={closeProfileMenu} style={{ color: 'black' }}>X</div>
            </div>
          )}
        </div>
      ) : (
        <button className='signin' onClick={navSign}>Войти</button>
      )}
    </div>
  )
}

export default Header
