import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from './api';
import Compressor from 'compressorjs';
import TinyMCE from './TinyMCE';
import './MakePost.css';

const MakePost = (props) => {
  const { me } = props;
  const admin = me.isAdmin;

  const [title, setTitle] = useState('');
  const [imageData, setImageData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    // Check if the selected file is an image
    if (file && file.type.startsWith('image/')) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(compressedResult) { // Use "compressedResult" instead of "result"
          const reader = new FileReader();
  
          reader.readAsDataURL(compressedResult); // Use the compressedResult directly
          reader.onload = (e) => {
            setImageData(e.target.result); // Set the compressed image data
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const userId = me.id;
    console.log(currentDate.toISOString())
    const postData = {
      title,
      body: editorHtml,
      image: imageData,
      date_created: currentDate.toISOString(),
      userId,
    };

    try {
      const response = await createPost(postData);
      console.log(response);
    } catch (error) {
      console.log(error);
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
              Body
              <div className="TinyMCE-container">
                <TinyMCE
                  value={editorHtml}
                  onEditorChange={setEditorHtml}
                />
              </div>
            </label>
            <label className="formInput">
              Photo
              <input
                type="file"
                id="d"
                onChange={handleImageUpload}
              />
            </label>
            <label className="formInput">
              Category
              <input
                type="text"
                id="d"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <button type="submit">Create listing</button>
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
