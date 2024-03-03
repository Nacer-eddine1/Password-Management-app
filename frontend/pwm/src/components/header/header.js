import React, { useState, useEffect } from 'react';
import "./header.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
      // Decode the token to get user information
      const decodedToken = jwtDecode(token);
      // Extract the user role from decoded token
      const userRole = decodedToken.role;
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from cookies and reset state
    Cookies.remove('token');
    setLoggedIn(false);
    setRole('');
  };

  return (
    <>
      <nav className='navbar'>
        <h3 className='logo'>Logo</h3>
        {loggedIn ? (
          <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
            {role === 'admin' && (
              <Link to='/users' className='users'>
                <li>Users</li>
              </Link>
            )}
            {role === 'client' && (
              <Link to='/passwords' className='passwords'>
                <li>Passwords</li>
              </Link>
            )}
            <li onClick={handleLogout}>Logout</li>
          </ul>
        ) : (
          <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
            <Link to='/' className='home'>
              <li>Home</li>
            </Link>
            <Link to='/about' className='about'>
              <li>About</li>
            </Link>
            <Link to='/signup' className='signup'>
              <li>Signup</li>
            </Link>
            <Link to='/login' className='login'>
              <li>Login</li>
            </Link>
          </ul>
        )}
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Header;
