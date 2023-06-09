import React, { useState, useEffect } from "react";
import './Posts.css';
import { useParams } from "react-router-dom";

const Posts = (props) => {
    
    return(
        <>
            <div className="headline">
            <h2>Featured Post</h2>
                <div className="horizontalRule"/>
                <h1>
                    <a href="#/login">Unveiling the Path to a Sustainable Future:
                     Exploring Climate Solutions and Hope Amidst
                      Challenges
                    </a>
                </h1>
                <h3>Nicole Bondurant</h3>
                <img src="https://placeimg.com/700/500/nature" alt="placeholder"/>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                 occaecat cupidatat non proident, sunt in culpa qui officia 
                 deserunt mollit anim id est laborum[...]
                </p>
                <div className="horizontalRule"/>
                <h2>Latest</h2>
                <div className="horizontalRule"/>

            </div>
        </>
    )
}

export default Posts;