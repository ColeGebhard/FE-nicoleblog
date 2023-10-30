import React from "react";
import { Buffer } from "buffer";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import './SinglePost.css';

const SinglePost = (props) => {
  const { posts } = props;
  const { id } = useParams();
  const post = posts.find((post) => parseInt(id) === post.id);
  const navigate = useNavigate();


  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed in words per minute
    const words = text.split(/\s+/).length; // Count words (split by spaces)
    const readTimeMinutes = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
    return readTimeMinutes;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const getRandomIndices = (array, count, currentPost) => {
    const candidates = array.filter(post => post.id !== currentPost.id);
    const shuffledArray = candidates.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, count);
  };

  console.log(post)

  const randomPosts = getRandomIndices(posts, 3, post)

  return (
    <div>
        
    </div>
  )

};

export default SinglePost;
