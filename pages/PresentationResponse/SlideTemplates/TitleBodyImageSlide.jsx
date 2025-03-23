/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import { styles } from '../styles';

import SlideContentEditor from '@/tools/components/ToolEditor/SlideContentEditor/SlideContentEditor';
import SlideImageEditor from '@/tools/components/ToolEditor/SlideImageEditor/SlideImageEditor';
import SlideTitleEditor from '@/tools/components/ToolEditor/SlideTitleEditor/SlideTitleEditor';

const TitleBodyImageSlide = ({ title, content, imageUrl }) => {
  const [editableContent, setEditableContent] = useState(content || ''); // Ensure content is never null/undefined
  const [editableTitle, setEditableTitle] = useState(title || '');

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <SlideTitleEditor
          style={styles.slide.title}
          title={
            Array.isArray(editableTitle) ? editableTitle[0] : editableTitle
          }
          onChange={setEditableTitle}
        />
        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <SlideContentEditor
              content={
                Array.isArray(editableContent)
                  ? editableContent[0]
                  : editableContent
              }
              onChange={setEditableContent}
            />
          </div>
          <div style={styles.slide.imageColumn}>
            <SlideImageEditor src={imageUrl} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleBodyImageSlide;
