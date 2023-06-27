import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import './Home.css';

const Home = (props) => {
  const { me } = props;

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track user login status
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const prevScrollPosRef = useRef(0);

  const menuRef = useRef();

  useEffect(() => {
    if (me) {
      setLoggedIn(true);
    }
  }, [me]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [navbarOpen]);

  const toggleMenu = () => {
    setNavbarOpen((prev) => !prev);
    setDropdownOpen(false);
  };


  return (
    <div className={`header`}>

      <nav className={`navbar`}>
        
        <NavLink to={'/'}className="mainTitle">green growth</NavLink>

        <button className="toggle" onClick={toggleMenu}>
          {navbarOpen ? (
            <MdClose
              style={{ width: '2em', height: '2em', color: '#d5e7b8' }}
            />
          ) : (
            <FiMenu
              style={{
                width: '2em',
                height: '2em',
                color: '#2c3d10',
              }}
            />
          )}
        </button>
        <div className="background-image" />

        <ul
          ref={menuRef}
          className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}
        >
          <li>
            <div className="navLinksOpen">
              <NavLink
                className="navList"
                to={'#'}
                onClick={() => setNavbarOpen(false)}
              >
                What's new
              </NavLink>
              <NavLink
                className="navList"
                to={'#'}
                onClick={() => setNavbarOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                className="navList"
                to={'#'}
                onClick={() => setNavbarOpen(false)}
              >
                Contact
              </NavLink>
              {loggedIn === true ? (
                <NavLink
                  className="navList"
                  to={'#'}
                  onClick={() => setNavbarOpen(false)}
                >
                  View Profile
                </NavLink>
              ) : (
                <NavLink
                  className="navList"
                  to={'/login'}
                  onClick={() => setNavbarOpen(false)}
                >
                  Login/Register            
                </NavLink>
              )}


            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
