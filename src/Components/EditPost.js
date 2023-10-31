import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { updatePost } from './api';
import TinyMCE from './TinyMCE';
import './MakePost.css';

const EditPost = (props) => {
    const { me, categories, posts, token } = props;
    const admin = me.isAdmin;
    const { id } = useParams();
    const post = posts.find((post) => parseInt(id) === post.id);

    const [previewMode, setPreviewMode] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState(post ? post.title : '');
    // const [imageData, setImageData] = useState(post ? post.image : null);
    const [editorHtml, setEditorHtml] = useState(post ? post.body : '');
    const [categoryId, setCategoryId] = useState(post ? post.categoryId : 0);
    const [isHeadline, setIsHeadline] = useState(post ? post.isHeadline : false);


    // const handleImageUpload = async (event) => {
    //     const file = event.target.files[0];

    //     setErrorMessage('');

    //     // Check if the selected file is an image
    //     if (file && file.type.startsWith('image/')) {
    //         const targetMaxFileSize = 100 * 1024; // 500KB (adjust to your desired size)
    //         let currentQuality = 0.7; // Starting quality value

    //         // automatically compresses image if size is too large
    //         const compressImage = () => {
    //             if (currentQuality < 0.1) {
    //                 setErrorMessage('Image too large, select a new one'); // Set an error message
    //                 return;
    //             }

    //             new Compressor(file, {
    //                 quality: currentQuality,
    //                 maxWidth: 700,
    //                 maxHeight: 700,
    //                 success(compressedResult) {
    //                     const compressedSize = compressedResult.size;

    //                     if (compressedSize <= targetMaxFileSize) {
    //                         const reader = new FileReader();

    //                         reader.readAsDataURL(compressedResult);
    //                         reader.onload = (e) => {
    //                             setImageData(e.target.result);
    //                         };
    //                     } else {
    //                         // Reduce quality and try again
    //                         currentQuality -= 0.1; // Decrease quality
    //                         compressImage();
    //                     }
    //                 },
    //                 error(err) {
    //                     console.error(err.message);
    //                 },
    //             });
    //         };

    //         compressImage();
    //     } else {
    //         setErrorMessage('Invalid file format, please select an image.');
    //     }
    // };


    const handleEdit = async (event) => {
        event.preventDefault();

        const updatedPostData = {
            postId: post.id,
            title,
            body: editorHtml,
            categoryId,
            isHeadline,
        };


        try {
            const response = await updatePost(updatedPostData, token);

            return response;
        } catch (error) {
            console.error(error);
        }
    };



    const handlePreview = (event) => {
        event.preventDefault();
        setPreviewMode(true);
    };


    const handleCancelPreview = (event) => {
        event.preventDefault();
        setPreviewMode(false);
    };

    const renderPreview = () => {
        return (
            <div className="preview">
                <h1>{title}</h1>
                <h3>Nicole Bondurant</h3>
                <img src={"https://placehold.co/600x400"} alt="placeholder" />
                <div dangerouslySetInnerHTML={{ __html: editorHtml }}></div>
            </div>
        );
    };

    return (
        <div className="makePost">
            {admin && post ? (
                <>
                    <form onSubmit={handleEdit} className="makePostForm">
                        <label className="formInput">
                            Title
                            <input
                                type="text"
                                id="titleInput"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        {/* <label className="formInput">
                            Photo
                            <p>*Leave blank to keep image</p>
                            <input
                                type="file"
                                id="imageUpload"
                                onChange={handleImageUpload}
                                className="fileInput"
                            />
                        </label>
                        <div className="errorContainer">
                            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        </div> */}

                        <label className="formInput">
                            Body
                            <div className="TinyMCE-container">
                                <TinyMCE
                                    initialContent={editorHtml}
                                    onEditorChange={setEditorHtml}
                                />
                            </div>
                        </label>
                        <label className="formInput">
                            Category
                            <select
                                name="category"
                                className='categorySelect'
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="" disabled>Select a Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="formInput">
                            Headline Article?
                            <h6>*Selecting this option will replace the current headline</h6>
                            <input
                                type="checkbox"
                                id="headlineCheckbox"
                                checked={isHeadline}
                                onChange={(e) => setIsHeadline(e.target.checked)}
                            />
                        </label>
                        <button className='submitButton' type="submit">Edit Post</button>
                    </form>
                    {previewMode ? (
                        <>
                            {renderPreview()}
                            <button onClick={handleCancelPreview}>Edit</button>
                        </>
                    ) : (
                        <button onClick={handlePreview}>Preview</button>
                    )}
                </>
            ) : (
                <Link className="notAdmin">Not permitted, Return Home</Link>
            )}
        </div>
    );
};

export default EditPost;
