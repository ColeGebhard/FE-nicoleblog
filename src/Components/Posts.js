import React, { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import './Posts.css';
import { useParams } from "react-router-dom";

const Posts = (props) => {
    const { posts } = props;

    console.log(posts);

    return (
        <>
            <div className="headline">
                <h1>
                    <a href="#/login">Unveiling the Path to a Sustainable Future:
                        Exploring Climate Solutions and Hope Amidst
                        Challenges
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
                            <div className="postCards" key={post.id}>
                                <h2>{post.title}</h2>
                                <img
                                    id="postImage"
                                    alt={post.title}
                                    src={`data:image/jpeg;base64,${Buffer.from(post.image.data).toString("base64")}`}
                                />
                                <p>{post.body.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, 20).join(' ')}...</p>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </>
    );
};

export default Posts;
