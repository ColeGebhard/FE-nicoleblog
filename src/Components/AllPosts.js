import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import './AllPosts.css';


const AllPosts = (props) => {
    const { posts, categories } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // Define the number of posts per page
    console.log('hello world')

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

    const sortPosts = () => {
        if (Array.isArray(posts) && posts.length > 0) {
            const sorted = [...posts].sort((a, b) => {
                return new Date(b.date_created) - new Date(a.date_created);
            });
            setSortedPosts(sorted);
        }
    };
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const [selectedSortCriteria, setSelectedSortCriteria] = useState("mostRecent"); // Default to most recent


    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 350); // Scroll to the top of the component

        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 350); // Scroll to the top of the component

        }
    };

    useEffect(() => {
        if (Array.isArray(posts) && posts.length > 0) {
            let sorted;
            switch (selectedSortCriteria) {
                case "mostRecent":
                    sorted = [...posts].sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
                    break;
                case "calculatedReadTime":
                    sorted = [...posts].sort((a, b) => calculateReadTime(b.body) - calculateReadTime(a.body));
                    break;
                case "alphabetical":
                    sorted = [...posts].sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    sorted = [...posts]; // Default to no sorting
            }
            setSortedPosts(sorted);
            setCurrentPage(1); // Reset to the first page after sorting
        }
    }, [selectedSortCriteria, posts]);


    useEffect(() => {
        sortPosts(); // Sort the posts by "Most Recent" when the component mounts
    }, []);



    useEffect(() => {
        setIsLoaded(true);
    }, []);

    console.log(posts, categories)
    return (
        <div className={`allPosts fade-in ${isLoaded ? "active" : ""}`} >
            <div className="header">
                <h3 className="missionStatement">
                    Please choose a topic to explore posts on {categories.map((category, index) => (
                        <React.Fragment key={category.id}>
                            {index > 0 && index < categories.length - 1 ? ', ' : ''}
                            {index === categories.length - 1 && index > 0 ? ' and ' : ''}
                            <Link to={`${category.id}`}>{category.name}</Link>
                        </React.Fragment>
                    ))}.
                </h3>


                <h1>Collection of All Posts</h1>

            </div>

            <select
                value={selectedSortCriteria}
                onChange={(e) => setSelectedSortCriteria(e.target.value)}
            >
                <option value="mostRecent">Most Recent</option>
                <option value="calculatedReadTime">Length</option>
                <option value="alphabetical">Alphabetical</option>
            </select>

            <div className="categorySpan">
                {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id} className="linkCards">
                            <div className={`postCards fade-in ${isLoaded ? "active" : ""}`} key={post.id}>
                                <span className="latestCardsText">
                                    <h2>{post.title}</h2>
                                    <p>{post.body.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, 20).join(' ')}...</p>
                                    <span className="latestCardNum">
                                        <h6>{formatDate(post.date_created)} &nbsp; &#9679;&nbsp;&nbsp;</h6>
                                        <h6> {calculateReadTime(post.body)} min read</h6>
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
                ) : null}

            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )

}

export default AllPosts;