import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SinglePost = (props) => {
    const {posts} = props
    const { postId } = useParams(); // Access post.id from the route parameter
    // const post = posts.find((post) => postId === post.id)

    console.log(postId)
    console.log(posts)
}

export default SinglePost;