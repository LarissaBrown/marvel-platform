/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';

import editorStyles from '../editorStyles'; // Import external styles

const SlideImageEditor = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(
    src || 'https://placehold.co/800x400/6A00F5/white'
  );
  const [previousImage, setPreviousImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const editor = useEditor({
    extensions: [Document, Image, Text, Paragraph, Dropcursor],
    content: imageSrc
      ? `<img src="${imageSrc}" />`
      : '<p style="text-align: center; color: gray;">No image available</p>',
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(
        imageSrc
          ? `<img src="${imageSrc}" />`
          : '<p style="text-align: center; color: gray;">No image available</p>'
      );
    }
  }, [imageSrc, editor]);

  const deleteImage = useCallback(() => {
    if (imageSrc) {
      setPreviousImage(imageSrc);
      setImageSrc(null);
    }
  }, [imageSrc]);

  const redoImage = useCallback(() => {
    if (previousImage) {
      setImageSrc(previousImage);
      setPreviousImage(null);
    }
  }, [previousImage]);

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      setPreviousImage(imageSrc);
      setImageSrc(url);
    }
  }, [imageSrc]);

  if (!editor) {
    return null;
  }

  return (
    <Grid
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={editorStyles.container}
    >
      {/* Image Display or Placeholder */}
      <EditorContent editor={editor} />

      {/* Button Group - Always Shows on Hover */}
      {isHovered && (
        <div style={editorStyles.buttonGroup}>
          <Button
            onClick={addImage}
            variant="contained"
            style={editorStyles.button}
          >
            Add Image
          </Button>
          <Button
            onClick={deleteImage}
            variant="contained"
            style={editorStyles.deleteButton}
          >
            Delete Image
          </Button>
          <Button
            onClick={redoImage}
            variant="contained"
            disabled={!previousImage}
            style={editorStyles.redoButton(!previousImage)}
          >
            Redo Image
          </Button>
        </div>
      )}
    </Grid>
  );
};

export default SlideImageEditor;
