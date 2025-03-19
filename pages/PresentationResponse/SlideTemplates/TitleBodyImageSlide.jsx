/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import SlideEditor from '../../../tools/components/SlideEditor/SlideEditor';
import { styles } from '../styles';

const TitleBodyImageSlide = ({ title, content, imageUrl }) => {
  const defaultImage = 'https://picsum.photos/800/400';
  const [editableContent, setEditableContent] = useState(content);
  const [showImage, setShowImage] = useState(true); // State to toggle image visibility

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>

        {/* Toggle Switch for Layout Change */}
        <div style={styles.slide.toggleContainer}>
          <label style={styles.slide.toggleLabel}>
            <input 
              type="checkbox" 
              checked={showImage} 
              onChange={() => setShowImage(!showImage)}
              style={styles.slide.toggleInput}
            />
            Show Image
          </label>
        </div>

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <SlideEditor 
              style={styles.slide.body} 
              content={Array.isArray(editableContent) ? editableContent[0] : editableContent} 
              onChange={setEditableContent} 
            />
          </div>

          {/* Conditionally Render Image */}
          {showImage && (
            <div style={styles.slide.imageColumn}>
              <img 
                src={imageUrl || defaultImage} 
                alt={title} 
                style={styles.slide.contentImage} 
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TitleBodyImageSlide;
