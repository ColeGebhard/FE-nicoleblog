import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { 
  Home,
  Login, 
  Posts, 
  SinglePost,
  MakePost,
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

  return (
    <BrowserRouter>
      <div className="App">
      <Home me={me} />

      {me.isAdmin === true ? (
          <div className="makeAPostDiv">
              <Link
                to={"/createPost"}
              >
                Make a Post
              </Link>
          </div>
        ):null}

        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/createPost" element={<MakePost me={me}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
