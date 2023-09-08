import React from "react";
import { Buffer } from "buffer";
import { Link, useParams } from "react-router-dom";
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

  const getRandomIndices = (array, count, currentPost) => {
    const candidates = array.filter(post => post.id !== currentPost.id);
    const shuffledArray = candidates.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, count);
  };

  const randomPosts = getRandomIndices(posts, 3, post)

  return post ? (
    <>
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
        <Link className="linkToBio" to="/about" onClick={scrollToTop}>
          <h3>Nicole Bondurant</h3>
        </Link>
        {/* Display the paragraph content without rendering HTML tags */}
        <div className="mainBodySingle" dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      <span className="readNext">
        <div className="horizontalRule" />
        <h2>More Like This</h2>
        <div className="horizontalRule" />

        <span className="nextArticle">

          {randomPosts.map((randomPost) => (
            <Link className="randomPostCard" key={randomPost.id} to={`/post/${randomPost.id}`}>
              <img
                id="randomPost"
                alt={randomPost.title}
                src={`data:image/jpeg;base64,${Buffer.from(randomPost.image.data).toString(
                  "base64"
                )}`}
              />
              <h4>{randomPost.title}</h4>
              <span className="numberText">
                <h6>{formatDate(randomPost.date_created)} &nbsp; &#9679;&nbsp;&nbsp;</h6> {/* Format the date here */}
                <h6> {calculateReadTime(randomPost.body)} min read</h6> {/* Display estimated read time */}
              </span>
            </Link>
          ))}
        </span>
      </span>
    </>
  ) : (
    <h1>No Post Found</h1>
  );
};

export default SinglePost;
