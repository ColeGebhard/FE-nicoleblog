import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css"

function NotFound() {
  return (
    <div className='notFoundPage'>
      <h2>404 - Page Not Found</h2>
      <p>Not all who wonder are lost</p>
      <p>Well maybe you are, but no worries</p>
      <h2 className='missionStatement'>Return <Link to={"/"}>Home</Link> or <Link to={"/posts"}>View Recent</Link></h2>
    </div>
  );
}

export default NotFound;
