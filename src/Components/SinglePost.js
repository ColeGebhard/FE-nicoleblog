import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './SinglePost.css';

const SinglePost = (props) => {
  const { posts } = props;
  const { id } = useParams();
  const post = posts.find((post) => parseInt(id) === post.id);

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

  return post ? (
    <div className="singlePost">
      <h1>{post.title}</h1>
      <img
        id="postImage"
        alt={post.title}
        src={`data:image/jpeg;base64,${Buffer.from(post.image.data).toString(
          "base64"
        )}`}
      />
      <span className="numberText">
        <h6>{formatDate(post.date_created)} &nbsp; &#9679;&nbsp;&nbsp;</h6>
        <h6> {calculateReadTime(post.body)} min read</h6>
      </span>
      <Link to="/about" onClick={scrollToTop}>
        <h3>Nicole Bondurant</h3>
      </Link>
      {/* Display the paragraph content without rendering HTML tags */}
      <p dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  ) : (
    <h1>No Post Found</h1>
  );
};

export default SinglePost;
