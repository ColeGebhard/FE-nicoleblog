import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from './api';
import Compressor from 'compressorjs';
import TinyMCE from './TinyMCE';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import './MakePost.css';

const MakePost = (props) => {
  const { me, categories } = props;
  const admin = me.isAdmin;

  const [title, setTitle] = useState('');
  const [imageData, setImageData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isHeadline, setIsHeadline] = useState(false); // Added

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    setErrorMessage('');

    // Check if the selected file is an image
    if (file && file.type.startsWith('image/')) {
      const targetMaxFileSize = 100 * 1024; // 500KB (adjust to your desired size)
      let currentQuality = 0.7; // Starting quality value

      // automatically compresses image if size is too large
      const compressImage = () => {
        if (currentQuality < 0.1) {
          setErrorMessage('Image too large, select a new one'); // Set an error message
          return;
        }

        new Compressor(file, {
          quality: currentQuality,
          maxWidth: 700,
          maxHeight: 700,
          success(compressedResult) {
            const compressedSize = compressedResult.size;

            if (compressedSize <= targetMaxFileSize) {
              const reader = new FileReader();

              reader.readAsDataURL(compressedResult);
              reader.onload = (e) => {
                setImageData(e.target.result);
              };
            } else {
              // Reduce quality and try again
              currentQuality -= 0.1; // Decrease quality
              compressImage();
            }
          },
          error(err) {
            console.error(err.message);
          },
        });
      };

      compressImage();
    } else {
      setErrorMessage('Invalid file format, please select an image.');
    }
  };


  //handle submission of new posts
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const userId = me.id;

    const postData = {
      title,
      body: editorHtml,
      image: imageData,
      date_created: currentDate.toISOString(),
      userId,
      categoryId,
      isHeadline
    };

    try {
      const response = await createPost(postData);
      if (response.error) {
        NotificationManager.error("Failed to Create Post", `${response.error}`)
    }  else {
      setTitle("");
      setImageData(null);
      setEditorHtml("");
      setCategoryId("");
      setIsHeadline(false);
      // Reset all state values to their initial empty state
      NotificationManager.success('Blog made succesfully!', 'Reload to see changes');

      return response
    }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = (event) => {
    event.preventDefault();
    setPreviewMode(true);
  };

  //incorperated useState to give a preview of posts before submission

  const handleCancelPreview = (event) => {
    event.preventDefault();
    setPreviewMode(false);
  };

  const renderPreview = () => {
    return (
      <div className="preview">
        <h1>{title}</h1>
        <h3>Nicole Bondurant</h3>
        <img src={imageData} alt="placeholder" />
        <div dangerouslySetInnerHTML={{ __html: editorHtml }}></div>
      </div>
    );
  };

  return (
    <div className="makePost">
      {admin === true ? (
        <>
          <form onSubmit={handleSubmit} className="makePostForm">
            <label className="formInput">
              Title
              <input
                type="text"
                id="titleInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="formInput">
              Photo
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageUpload}
                className="fileInput"
              />
            </label>
            <div className="errorContainer">
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </div>


            <label className="formInput">
              Body
              <div className="TinyMCE-container">
                <TinyMCE
                  value={editorHtml}
                  onEditorChange={setEditorHtml}
                />
              </div>
            </label>
            <label className="formInput">
              Category
              <select
                name="category"
                className="categorySelect"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" disabled>
                  Select a Category
                </option>
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
            <button className='submitButton' type="submit">Create Post</button>
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

export default MakePost;
