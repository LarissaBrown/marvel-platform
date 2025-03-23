import React, { useEffect, useState, useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';

import editorStyles from '../editorStyles';

const SlideContentEditor = ({ content = '', onChange }) => {
  const [editorContent, setEditorContent] = useState(content);
  const [previousContent, setPreviousContent] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Heading,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      if (newContent !== editorContent) {
        setEditorContent(newContent);
        onChange(newContent);
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editorContent) {
      editor.commands.setContent(content);
      setEditorContent(content);
    }
  }, [content, editor]);

  // Delete content while saving the previous state
  const deleteContent = useCallback(() => {
    if (editor) {
      setPreviousContent(editorContent);
      editor.commands.clearContent();
      setEditorContent('');
      onChange('');
    }
  }, [editor, editorContent]);

  // Restore previously deleted content
  const redoContent = useCallback(() => {
    if (editor && previousContent) {
      editor.commands.setContent(previousContent);
      setEditorContent(previousContent);
      onChange(previousContent);
      setPreviousContent(null);
    }
  }, [editor, previousContent]);

  return (
    <Grid
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...editorStyles.editorContainer,
        position: 'relative', // Needed for absolute positioning of buttons
      }}
    >
      {editor ? (
        <>
          {/* Bubble Menu */}
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={editorStyles.menu}>
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                style={
                  editor.isActive('bold')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                B
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                style={
                  editor.isActive('italic')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                I
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                style={
                  editor.isActive('underline')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                U
              </Button>
            </div>
          </BubbleMenu>

          {/* Main Editor Content */}
          <EditorContent editor={editor} />

          {/* Button Group - Appears at top of hover area */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                gap: '8px',
                padding: '5px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '4px',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                zIndex: 10,
              }}
            >
              <Button
                onClick={deleteContent}
                variant="contained"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  minWidth: 'unset',
                }}
              >
                Delete
              </Button>
              <Button
                onClick={redoContent}
                variant="contained"
                disabled={!previousContent}
                style={{
                  backgroundColor: previousContent ? 'green' : 'gray',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  minWidth: 'unset',
                }}
              >
                Redo
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>Loading editor...</p>
      )}
    </Grid>
  );
};

export default SlideContentEditor;
