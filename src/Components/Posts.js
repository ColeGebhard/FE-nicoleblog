import React, { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import './Posts.css';
import { Link } from "react-router-dom";

const Posts = (props) => {
    const { posts } = props;
    const [isLoaded, setIsLoaded] = useState(false);

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

    let headlinePost = null; // Initialize headlinePost as null
    let sortedPosts = [];
    let latestPosts = [];
    
    if (!posts.error) {
      headlinePost = posts.find((post) => post.isHeadline === true);
    
      // Filter and sort posts if there is no error
      sortedPosts = posts
        .filter((post) => post !== headlinePost) // Filter out the headlinePost
        .sort((a, b) => b.date_created - a.date_created);
    
      latestPosts = sortedPosts.slice(0, 3); // Get the latest 3 posts
    }
    
    // Now you can use headlinePost, sortedPosts, and latestPosts.
    

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            {headlinePost ? (
                <div className={`headline fade-in ${isLoaded ? "active" : ""}`}>

                    <Link to={`/post/${headlinePost.id}`}>
                        <h1>
                            {headlinePost.title}
                        </h1>
                    </Link>
                    <Link to={`/about`}>
                        <h3>Nicole Bondurant</h3>
                    </Link>
                    <Link to={`/post/${headlinePost.id}`}>
                        <img
                            id="postImage"
                            alt={headlinePost.title}
                            src={`data:image/jpeg;base64,${Buffer.from(headlinePost.image.data).toString("base64")}`}
                        />                    </Link>
                    <p>
                        {headlinePost.body
                            .replace(/<[^>]*>/g, '') // Remove HTML tags
                            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
                            .split(' ')
                            .slice(0, 20)
                            .join(' ')}...
                    </p>
                </div>) : null}
            <div className="mainBody">
                <div className="horizontalRule" />
                <h2>Latest</h2>
                <div className="horizontalRule" />
                <div className="postCardContainer">
                    {posts.error ? (
                        <h1>{posts.error}</h1>
                    ) : (
                        latestPosts.map((post) => (
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
                <h3 className="missionStatement">
                    At Auburn Activist, I compile topics based on <Link>Conservation</Link>, <Link>Climate Justice</Link>, <Link>Activism</Link>, and <Link>Progressive Solutions</Link>. <br /><Link>All Topics</Link>.
                </h3>
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
                                        <h6>{formatDate(post.date_created)} &nbsp; &#9679;&nbsp;&nbsp; </h6> {/* Format the date here */}
                                            <h6> {calculateReadTime(post.body)} min read</h6> {/* Display estimated read time */}
                                        </span>
                                    </span>
                                    <img
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
