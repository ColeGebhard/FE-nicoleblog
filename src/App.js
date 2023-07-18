import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import {
  Home,
  Login,
  Posts,
  About,
  SinglePost,
  MakePost,
  Footer
} from './Components/index.js';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0); // Simulate a 1-second loading time
  }, []);

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

  return loading ? (
    <span className="loader">
      <span className="loader-inner">
      </span>
    </span>
  ) : (
    <BrowserRouter>
      <div className="App">

        {me.isAdmin === true ? (
          <div className="makeAPostDiv">
            <Link
              to={"/createPost"}
            >
              Make a Post
            </Link>
          </div>
        ) : null}

        <Home me={me} />


        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/createPost" element={<MakePost me={me} />} />
          <Route path="post/:id" element={<SinglePost posts={posts}/>} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
