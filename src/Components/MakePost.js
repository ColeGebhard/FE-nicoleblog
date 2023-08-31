import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from './api';
import Compressor from 'compressorjs';
import TinyMCE from './TinyMCE';
import './MakePost.css';

const MakePost = (props) => {
  const { me, categories } = props;
  const admin = me.isAdmin;

  const [title, setTitle] = useState('');
  const [imageData, setImageData] = useState(null);
  const [category, setCategory] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    setErrorMessage('');


    // Check if the selected file is an image
    if (file && file.type.startsWith('image/')) {
      const targetMaxFileSize = 50 * 1024; // 500KB (adjust to your desired size)
      let currentQuality = 0.7; // Starting quality value

      const compressImage = () => {
        if (currentQuality < 0.1) {
          setErrorMessage("Image too large, select a new one");
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
            console.log(err.message);
          },
        });
      };

      compressImage();
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

  console.log(category)

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
                className='categorySelect'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select a Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
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
