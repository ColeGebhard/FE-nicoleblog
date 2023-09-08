import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import './Home.css';
import { subscribeEmail } from './api';

const Home = (props) => {

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [,setDropdownOpen] = useState(false)

  const menuRef = useRef();

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
    if (navbarOpen) {
      // Enable scrolling when closing the menu
      document.body.style.overflow = 'auto';
    } else {
      // Disable scrolling when opening the menu
      document.body.style.overflow = 'hidden';
    }
    setNavbarOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  const SubscribeForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const subEmail = await subscribeEmail({ email });

        if (subEmail.error) {
          window.alert('Subscribe fail');
        } else {
          setEmail("")
          window.alert('Subscribe success');
        }
      } catch (e) {
        console.err('Failed to subscribe', e);
      }
    };

    return (
      <form className='emailForm' onSubmit={handleSubmit}>
        <fieldset className='emailFormField'>
          <p className='description'>Subscribe to get updates on new readings</p>
          <span className='textSpan'>
            <input
              aria-label="Email address"
              name="email_address"
              placeholder="Email address"
              required
              type="email"
              className='emailInput'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button type="submit" className='subscribeButton'>Submit</button>
          </span>
        </fieldset>
      </form>
    );
  };


  return (
    <div className={`header`}>

      <nav className={`navbar`}>

        <NavLink to={'/'} className="mainTitle">Auburn Activist</NavLink>

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
                to={'/about'}
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
              <SubscribeForm />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
