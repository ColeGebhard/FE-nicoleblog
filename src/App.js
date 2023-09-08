import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Home,
  Login,
  Posts,
  About,
  SinglePost,
  MakePost,
  Footer,
  Admin,
  EditPost
} from './Components/index.js';
import { getAllPosts, isUser, getAllCategories } from './Components/api.js';
import './App.css';


export const TOKEN_STORAGE_KEY = 'user-token';
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = 'user-username';

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(storedToken);
  const [me, setMe] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0); // Simulate a 1-second loading time
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((e) => {
        console.error('Failed to load Posts');
      });
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
    <div className="App">
      {me.isAdmin === true ? (
        <div className="makeAPostDiv">
          <Link to={"/createPost"}>Make a Post</Link>
          <Link to={"/adminfeatures"}>Admin Features</Link>
        </div>
      ) : null}

      <Home me={me} />

      <Routes>
        <Route path="/" element={<Posts posts={posts} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/createPost" element={<MakePost posts={posts} me={me} categories={categories} token={token} />} />
        <Route path="post/:id" element={<SinglePost posts={posts} />} />
        <Route path="editpost/:id" element={<EditPost posts={posts} me={me} categories={categories} token={token} />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminfeatures" element={<Admin posts={posts} me={me} categories={categories} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
