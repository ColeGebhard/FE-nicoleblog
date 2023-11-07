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
  EditPost,
  Categories,
  DeleteEmail,
  NotFound
} from './Components/index.js';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { getAllPosts, isUser, getAllCategories } from './Components/api.js';
import './App.css';
import AllPosts from './Components/AllPosts.js';


export const TOKEN_STORAGE_KEY = 'user-token';
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = 'user-username';

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(storedToken);
  const [me, setMe] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])

  const isDataLoaded = () => {
    return posts.length > 0 && categories.length > 0 && me !== '' && !loading;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time

    // Fetch data inside this useEffect
    Promise.all([getAllPosts(), getAllCategories()])
      .then(([fetchedPosts, fetchedCategories]) => {
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
        setLoading(false); // Mark loading as complete
      })
      .catch((e) => {
        console.error('Failed to load data:', e);
        setLoading(false); // Mark loading as complete even on error
      });
  }, []); // Include 'token' in the dependency array

  useEffect(() => {
    if (token) {
      isUser(token)
        .then((fetchedMe) => {
          setMe(fetchedMe);
        })
        .catch((e) => {
          throw new Error(`Failed to fetch myself.`);
        });
    }
  }, [token]);

  return loading && !isDataLoaded() ? (
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
        <Route path="/" element={<Posts posts={posts} categories={categories} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/createPost" element={<MakePost posts={posts} me={me} categories={categories} token={token} />} />
        <Route path="post/:id" element={<SinglePost posts={posts} />} />
        <Route path="editpost/:id" element={<EditPost posts={posts} me={me} categories={categories} token={token} />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminfeatures" element={<Admin posts={posts} me={me} categories={categories} token={token} />} />
        <Route path='/posts' element={<AllPosts posts={posts} categories={categories}/>}/>
        <Route path='/posts/:categoryId' element={<Categories posts={posts} categories={categories}/>}/>
        <Route path='/unsubsribe' element={<DeleteEmail/>}/>
        <Route path="*" element={<NotFound />} />
        <Route path="" redirectTo="/" />

      </Routes>

      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App;
