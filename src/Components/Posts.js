import React, { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import './Posts.css';
import { Link } from "react-router-dom";

const Posts = (props) => {
    const { posts } = props;
    const [isLoaded, setIsLoaded] = useState(false);

    console.log(posts)

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        };
        return dateObj.toLocaleDateString('en-US', options);
      };
    
      const calculateReadTime = (text) => {
        const wordsPerMinute = 200; // Average reading speed in words per minute
        const words = text.split(/\s+/).length; // Count words (split by spaces)
        const readTimeMinutes = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
        return readTimeMinutes;
      };
      
      

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            <div className={`headline fade-in ${isLoaded ? "active" : ""}`}>
                <h1>
                    <a href="#/login">Unveiling the Path to a Sustainable Future:
                        Exploring Climate Solutions and Hope Amidst Challenges
                    </a>
                </h1>
                <h3>Nicole Bondurant</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Himalayas.jpg/1200px-Himalayas.jpg" alt="placeholder" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi[...]
                </p>
            </div>
            <div className="mainBody">
                <div className="horizontalRule" />
                <h2>Latest</h2>
                <div className="horizontalRule" />
                <div className="postCardContainer">
                    {posts.error ? (
                        <h1>{posts.error}</h1>
                    ) : (
                        posts.map((post) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="linkCards">

                                <div className={`postCards fade-in ${isLoaded ? "active" : ""}`} key={post.id}>
                                    <span className="latestCardsText">
                                        <h2>{post.title}</h2>
                                        <p>{post.body.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, 20).join(' ')}...</p>
                                        <span className="latestCardNum">
                                        <h6>{formatDate(post.date_created)} &nbsp; &#9679;&nbsp;&nbsp;</h6> {/* Format the date here */}
                                        <h6> {calculateReadTime(post.body)} min read</h6> {/* Display estimated read time */}
                                        </span>
                                    </span>
                                    <img
                                        id="postImage"
                                        alt={post.title}
                                        src={`data:image/jpeg;base64,${Buffer.from(post.image.data).toString("base64")}`}
                                    />
                                </div>
                            </Link>
                        ))
                    )}

                </div>
                <div className="horizontalRule" />
                <h2>Featured</h2>
                <div className="horizontalRule" />
                <div className="postCardContainer">
                    {posts.error ? (
                        <h1>{posts.error}</h1>
                    ) : (
                        posts.map((post) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="linkCards">

                            <div className={`featuredCards fade-in ${isLoaded ? "active" : ""}`} key={post.id}>
                                <span className="featuredCardText">
                                    <h2>{post.title}</h2>
                                    <p>{post.body.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, 20).join(' ')}...</p>
                                    <span className="latestCardNum">
                                    <h6> {calculateReadTime(post.body)} min read</h6> {/* Display estimated read time */}
                                    <h6>{formatDate(post.date_created)} &nbsp; &#9679;&nbsp;&nbsp; </h6> {/* Format the date here */}
                                    </span>
                                </span>
                                <img
                                    id="postImage"
                                    alt={post.title}
                                    src={`data:image/jpeg;base64,${Buffer.from(post.image.data).toString("base64")}`}
                                />
                            </div>
                            </Link>
                        ))
                    )}

                </div>
            </div>
        </>
    );
};

export default Posts;
