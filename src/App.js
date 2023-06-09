import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home, Login, Posts, SinglePost } from './Components/index.js';
import { getAllPosts, isUser } from './Components/api.js';
import './App.css';

export const TOKEN_STORAGE_KEY = 'user-token';
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = 'user-username';
const storedUser = localStorage.getItem(USER_STORAGE_KEY);

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(storedToken);
  const [me, setMe] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((e) => {
        console.error('Failed to load Posts');
      });
  }, []);

  useEffect(() => {
    if (token) {
      isUser(token)
        .then((me) => {
          setMe(me);
        })
        .catch((e) => {
          throw new Error(`Failed to fetch myself.`);
        });
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButton(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Home me={me} />
        {showScrollButton && (
          <button className="scroll-button" onClick={handleScrollTop}>
            Scroll to Top
          </button>
        )}
        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
