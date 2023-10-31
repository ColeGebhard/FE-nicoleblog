import React from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { deletePost } from "./api";
import './Admin.css';



const Admin = (props) => {
    const {
        posts,
        token
    } = props;

    // const [isFeatured, setIsFeatured] = useState(false);


    let headlinePost = null
    let sortedPosts = [];
    

    if (posts) {
        headlinePost = posts.find((post) => post.isHeadline === true);

        sortedPosts = posts
            .filter((post) => post !== headlinePost) // Filter out the headlinePost
    }

    const handleSaveChanges = async (event) => {
        event.preventDefault();
    }

    const handleDelete = async (postId, title) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmed) {
          try {
            const response = await deletePost(postId, token );
            window.location.reload();

            return response
        } catch (error) {
            console.error('Failed to delete the post:', error);
          }
        }
      };
      

    return (
        <form onSubmit={handleSaveChanges} className="adminPage">
            <h1>Admin Privlages</h1>
            <h2>Headline Post</h2>
            {headlinePost ? (<span className="headlinePost">
                <Link to={`/post/${headlinePost.id}`}>
                    <h1>
                        {headlinePost.title}
                    </h1>
                </Link>
                <img
                    id="postImage"
                    alt={headlinePost.title}
                    src={`data:image/jpeg;base64,${Buffer.from(headlinePost.image.data).toString("base64")}`}
                />
                <button onClick={() => handleDelete(headlinePost.id, headlinePost.title)} id="deleteButton">
                    <img
                        src="../images/DeleteIcon.svg"
                        alt="edit"
                    />
                </button>
                <Link to={`/editpost/${headlinePost.id}`} id="editButton">
                    <img
                        src="../images/EditIcon.png"
                        alt="edit"
                    />
                </Link>

            </span>) : null}
            <h2>All posts</h2>
            <div className="allAdminPostCards">
                {sortedPosts.map((post) => (
                    <div key={post.id}className="allAdminCard">
                    <span key={post.id} className="allAdminPost">
                        <button onClick={() => handleDelete(post.id, post.title)} id="deleteButton">
                            <img
                                src="../images/DeleteIcon.svg"
                                alt="edit"
                            />
                        </button>
                        <Link to={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <Link to={`/editpost/${post.id}`} id="editButton">
                            <img
                                src="../images/EditIcon.png"
                                alt="edit"
                            />
                        </Link>
                    </span>
                    {/* Come back later */}
                    {/* <label className="formInput">
                            Featured Article?
                            <input
                                type="checkbox"
                                id="headlineCheckbox"
                                checked={isFeatured}
                                onChange={(e) => setIsHeadline(e.target.checked)}
                            />
                        </label> */}
                    </div>
                ))}
            </div>
            {/* <button type="submit">
                Save
            </button> */}
        </form>
    )

}

export default Admin;